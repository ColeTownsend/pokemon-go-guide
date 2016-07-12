import React from 'react'
import { prefixLink } from 'gatsby-helpers'
import { TypographyStyle } from 'typography-react'
import typography from './utils/typography'
import { colors } from 'utils/colors'
import { config } from 'config'
import Helmet from 'react-helmet'

const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
  displayName: 'HTML',
  propTypes: {
    body: React.PropTypes.string,
  },

  getDefaultProps () {
    return {
      body: '',
    }
  },

  render () {
    let css
    let head = Helmet.rewind()

    if (process.env.NODE_ENV === 'production') {
      css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0 maximum-scale=5.0"
          />
          <meta
            name="description"
            content={config.siteDescription}
          />
          <link rel="icon" href="//pokemongotips.co/favicon.ico" />
          <title>{head.title.toComponent()}</title>

          {head.meta.toComponent()}
          {head.link.toComponent()}
          <TypographyStyle typography={typography} />
          {css}
          <style
            dangerouslySetInnerHTML={{
              __html:
                `
                  a {
                    color: ${colors.bg};
                `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
              `
              !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="3.1.0";
              analytics.load("rYkns9pNk7wjyoe79YWsoJFMhlx4PYwz");
              analytics.page()
              }}();
              `,
            }}
          />
        </head>
        <body>
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        </body>
      </html>
    )
  },
})
