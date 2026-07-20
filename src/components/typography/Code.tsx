import React, { useState, useEffect, useRef } from 'react';
import { clsx } from '../../utils/clsx';
import { LayoutBaseProps } from '../../types';
import { Check, Copy } from 'lucide-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

export interface CodeProps extends LayoutBaseProps {
    language?: string;
    inline?: boolean;
    showLineNumbers?: boolean;
    copyable?: boolean;
    highlight?: boolean;
    wrap?: boolean;
    maxHeight?: number | string;
}

export function Code({
    children,
    language,
    inline = false,
    showLineNumbers = false,
    copyable = false,
    highlight = true,
    wrap = false,
    maxHeight,
    className = '',
    style = {},
}: React.PropsWithChildren<CodeProps>) {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current && highlight && !inline) {
            hljs.highlightElement(codeRef.current);
        }
    }, [children, language, highlight, inline]);

    const handleCopy = () => {
        const code = typeof children === 'string' ? children : '';
        navigator.clipboard?.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (inline) {
        return (
            <code
                className={clsx(
                    'px-1.5 py-0.5 text-sm font-mono rounded-md bg-muted/50 text-foreground border border-border',
                    className
                )}
                style={style}
            >
                {children}
            </code>
        );
    }

    const codeLines = typeof children === 'string' ? children.split('\n') : [];

    const maxHeightStyle = maxHeight
        ? typeof maxHeight === 'number'
            ? `${maxHeight}px`
            : maxHeight
        : undefined;

    return (
        <div className={clsx('relative group w-full', className)} style={style}>
            {(language || copyable) && (
                <div className="flex items-center justify-between px-4 py-2 rounded-t-lg bg-muted/80 border border-border border-b-0">
                    {language && (
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {language}
                        </span>
                    )}
                    {copyable && (
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {copied ? (
                                <>
                                    <Check size={14} className="text-success" />
                                    <span className="text-success">Copié</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    <span>Copier</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}

            <pre
                className={clsx(
                    'p-4 rounded-b-lg bg-[#0d1117] border border-border border-t-0',
                    'font-mono text-sm leading-relaxed',
                    !language && !copyable && 'rounded-t-lg border-t',
                    wrap ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto',
                    className
                )}
                style={{
                    maxHeight: maxHeightStyle,
                    overflow: maxHeight ? 'auto' : undefined,
                }}
            >
                {showLineNumbers ? (
                    <code className="hljs">
                        {codeLines.map((line, index) => (
                            <div key={index} className="flex gap-4">
                                <span className="text-muted-foreground/50 select-none w-6 text-right">
                                    {index + 1}
                                </span>
                                <span className="flex-1">{line || ' '}</span>
                            </div>
                        ))}
                    </code>
                ) : (
                    <code ref={codeRef} className={language ? `language-${language}` : ''}>
                        {children}
                    </code>
                )}
            </pre>
        </div>
    );
}

export default Code;