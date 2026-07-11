/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { translateText, LanguageCode } from '../translations';

interface BilingualProviderProps {
  lang: string;
  children: React.ReactNode;
}

export function BilingualProvider({ lang, children }: BilingualProviderProps) {
  // If language is Indonesian, render normally to guarantee perfect native performance
  if (lang === 'id') {
    return <>{children}</>;
  }

  const translateNode = (node: React.ReactNode): React.ReactNode => {
    if (node === null || node === undefined) {
      return node;
    }

    if (typeof node === 'string') {
      return translateText(node, lang as LanguageCode);
    }

    if (typeof node === 'number' || typeof node === 'boolean') {
      return node;
    }

    if (React.isValidElement(node)) {
      const props = node.props as any;
      let newProps: any = null;

      // Check if we need to translate children or string props
      const hasStringProps = 
        (typeof props.placeholder === 'string') ||
        (typeof props.title === 'string') ||
        (typeof props.label === 'string');

      const hasChildren = props.children !== undefined;

      if (hasChildren || hasStringProps) {
        newProps = { ...props };

        if (hasChildren) {
          if (typeof props.children === 'string') {
            newProps.children = translateText(props.children, lang as LanguageCode);
          } else if (typeof props.children === 'function') {
            // Keep function/render-props unmodified
          } else {
            newProps.children = React.Children.map(props.children, translateNode);
          }
        }

        if (typeof props.placeholder === 'string') {
          newProps.placeholder = translateText(props.placeholder, lang as LanguageCode);
        }
        if (typeof props.title === 'string') {
          newProps.title = translateText(props.title, lang as LanguageCode);
        }
        if (typeof props.label === 'string') {
          newProps.label = translateText(props.label, lang as LanguageCode);
        }
      }

      if (newProps) {
        return React.cloneElement(node, newProps);
      }
      return node;
    }

    if (Array.isArray(node)) {
      return node.map(translateNode);
    }

    return node;
  };

  return <>{translateNode(children)}</>;
}
