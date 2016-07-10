import React from 'react'
import Helmet from 'react-helmet'
import { config } from 'config'

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  render () {
    const post = this.props.route.page.data

    return (
      <div className="markdown">
        <Helmet
          title={`${post.title} | ${config.siteTitle}`}
          meta={[
              { property: 'og:type', content: 'article' },
              { property: 'og:title', content: post.title },
              { property: 'og:site_name', content: config.siteTitle },
              { property: 'og:url', content: '#{config.siteBaseUrl}#{this.props.route.path}' },
              { property: 'og:description', content: post.description },
              { property: 'twitter:account_id', content: '232639632' },
              { property: 'twitter:card', content: 'summary' },
              { property: 'twitter:site', content: '@twnsndco' },
              { property: 'twitter:title', content: post.title },
              { property: 'twitter:description', content: post.description },
              { name: 'description', content: post.description },
          ]}
          link={[
            { rel: 'shortcut icon', href: '#{config.siteBaseUrl}/public/favicon.ico' },
          ]}
        />
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>
    )
  },
})
