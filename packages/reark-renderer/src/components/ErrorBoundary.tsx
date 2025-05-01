import { Component, ErrorInfo, ReactNode } from "react";
import { css } from "@emotion/react";

const errorContainerStyle = css({
  padding: "16px",
  margin: "16px 0",
  backgroundColor: "#fff3f3",
  border: "1px solid #dc3545",
  borderRadius: "4px",
  color: "#dc3545",
});

const errorTitleStyle = css({
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "8px",
});

const errorMessageStyle = css({
  fontSize: "14px",
  marginBottom: "12px",
});

const errorStackStyle = css({
  fontSize: "12px",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap",
  backgroundColor: "#fff",
  padding: "8px",
  borderRadius: "4px",
  maxHeight: "200px",
  overflowY: "auto",
});

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div css={errorContainerStyle}>
          <div css={errorTitleStyle}>Something went wrong</div>
          <div css={errorMessageStyle}>
            {this.state.error?.message || "An unknown error occurred"}
          </div>
          {this.state.errorInfo && (
            <div css={errorStackStyle}>
              {this.state.errorInfo.componentStack}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
