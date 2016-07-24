import React from 'react'
import Helmet from 'react-helmet'
import { config } from 'config'
import Calculator from './_Calculator'

const EvolutionCalculatorPage = React.createClass({
  statics: {
    metadata () {
      return {
        title: 'Evolution CP Calculator',
        description: 'A simple Evolution CP calculator for Pokemon Go game on iOS and Android',
      }
    },
  },

  render () {

    return (
      <div className="markdown">
        <Helmet
          title={`${EvolutionCalculatorPage.metadata().title} | ${config.siteTitle}`}
          meta={[
              { property: 'og:type', content: 'article' },
              { property: 'og:title', content: EvolutionCalculatorPage.metadata().title },
              { property: 'og:site_name', content: config.siteTitle },
              { property: 'og:url', content: '#{config.siteBaseUrl}#{this.props.route.path}' },
              { property: 'og:description', content: EvolutionCalculatorPage.metadata().description },
              { property: 'twitter:account_id', content: '232639632' },
              { property: 'twitter:card', content: 'summary' },
              { property: 'twitter:site', content: '@twnsndco' },
              { property: 'twitter:title', content: EvolutionCalculatorPage.metadata() },
              { property: 'twitter:description', content: EvolutionCalculatorPage.metadata().description },
              { name: 'description', content: EvolutionCalculatorPage.metadata().description },
          ]}
          link={[
            { rel: 'shortcut icon', href: config.siteBaseUrl + '/public/favicon.ico' },
          ]}
        />
        <h1>{EvolutionCalculatorPage.metadata().title}</h1>
        <div>
          <Calculator />
        </div>
      </div>
    )
  },
})

export default EvolutionCalculatorPage
