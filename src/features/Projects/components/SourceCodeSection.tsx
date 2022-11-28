import React from "react";
import Highlight, {defaultProps} from "prism-react-renderer";
import theme from 'prism-react-renderer/themes/oceanicNext'
// @ts-ignore
import styled from "styled-components";

interface CodeProps {
    sourceCode: string
}

const Pre = styled.pre`
  border-radius: 15px;
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

export default function SourceCodeSection ({sourceCode}: CodeProps) {
    return (
        <Highlight {...defaultProps} theme={theme} code={sourceCode} language="jsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <Line key={i} {...getLineProps({ line, key: i })}>
                            <LineNo>{i + 1}</LineNo>
                            <LineContent>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </LineContent>
                        </Line>
                    ))}
                </Pre>
            )}
        </Highlight>
    )
}