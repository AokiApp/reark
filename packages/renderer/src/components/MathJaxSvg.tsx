import React, { useEffect, useRef, useState } from "react";
import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

type MathJaxSvgProps = {
  tex: string;
  className?: string;
  style?: React.CSSProperties;
};

export const MathJaxSvg: React.FC<MathJaxSvgProps> = ({
  tex,
  className,
  style,
}) => {
  const [svg, setSvg] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adaptorRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const htmlRef = useRef<any>(null);

  useEffect(() => {
    // MathJax の初期化
    if (!adaptorRef.current) {
      adaptorRef.current = liteAdaptor();
      RegisterHTMLHandler(adaptorRef.current);
      htmlRef.current = mathjax.document("", {
        InputJax: new TeX({ packages: AllPackages }),
        OutputJax: new SVG({ fontCache: "none" }),
      });
    }
    const adaptor = adaptorRef.current;
    const html = htmlRef.current;

    // SVG 生成
    try {
      const node = html.convert(tex, { display: true });
      const svgString = adaptor.outerHTML(node);
      setSvg(svgString);
    } catch (e) {
      setSvg("<span style='color:red'>数式エラー</span>");
    }
  }, [tex]);

  return (
    <span
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
