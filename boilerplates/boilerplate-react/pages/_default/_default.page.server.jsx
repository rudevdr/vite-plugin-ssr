import ReactDOMServer from "react-dom/server";
import React from "react";
import { PageWrapper } from "./PageWrapper";
import { html } from "vite-plugin-ssr";
import logoUrl from "./logo.svg";

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps"];

async function render(pageContext) {
  const { Page, pageProps } = pageContext;
  const pageHtml = ReactDOMServer.renderToString(
    <PageWrapper>
      <Page {...pageProps} />
    </PageWrapper>
  );

  // See https://vite-plugin-ssr.com/html-head
  const { documentProps } = pageContext;
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc = (documentProps && documentProps.description) || "App using Vite + vite-plugin-ssr";

  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${html.dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}