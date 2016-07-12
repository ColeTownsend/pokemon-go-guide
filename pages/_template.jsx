import React from 'react'
import { Link } from 'react-router'
import Breakpoint from 'components/Breakpoint'
import find from 'lodash/find'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import typography from 'utils/typography'
const { rhythm } = typography
import { Container, Grid, Span } from 'react-responsive-grid'
import { colors } from 'utils/colors'

// Import styles.
import 'css/main.css'
import '../assets/fonts/hs.css'


module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
  handleTopicChange (e) {
    return this.context.router.push(e.target.value)
  },

  render () {
    const childPages = config.docPages.map((p) => {
      const page = find(this.props.route.pages, (_p) => _p.path === p)
      return {
        title: page.data.title,
        path: page.path,
      }
    })
    const docOptions = childPages.map((child) =>
      <option
        key={prefixLink(child.path)}
        value={prefixLink(child.path)}
      >
        {child.title}
      </option>

    )
    const guidePages = childPages.map((child) => {
      const isActive = prefixLink(child.path) === this.props.location.pathname
      return (
        <li
          key={child.path}
          style={{
            marginBottom: rhythm(1/4),
            paddingLeft: rhythm(1),
            paddingRight: rhythm(1),
            fontWeight: '500',
          }}
        >
          <Link
            to={prefixLink(child.path)}
            style={{
              textDecoration: 'none',
              color: isActive ? '#1DAD90' : '#24CCAA',
            }}
          >
            {child.title}
          </Link>
        </li>
      )
    })
    return (
      <div>
        <div
          style={{
            background: colors.bg,
            color: colors.fg,
            marginBottom: rhythm(1.5),
            fontSize: '20px',
          }}
        >
          <Container
            style={{
              maxWidth: 960,
              padding: `${rhythm(1/2)}`,
              paddingBottom: `${rhythm(1/2)}`,
            }}
          >
            <Grid
              columns={12}
              style={{
                padding: `${rhythm(1/2)} 0`,
              }}
            >
              <Span
                columns={6}
              >
                <Link
                  to={prefixLink('/')}
                  style={{
                    textDecoration: 'none',
                    color: '#fff',
                    fontWeight: '600',
                  }}
                >
                  {config.siteTitle}
                </Link>
              </Span>
              <Span
                columns={6} last
                style={{
                  textAlign: 'right',
                  display: 'inline-block',
                }}
              >
                <Link
                  to={prefixLink('/about/')}
                  style={{
                    textDecoration: 'none',
                    display: 'inline-block',
                    color: colors.fg,
                    fontSize: '15px',
                    marginRight: '30px',
                  }}
                >
                  About
                </Link>
                <a
                  href="https://twnsnd.co"
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                    color: colors.fg,
                    fontSize: '15px',
                  }}
                >
                  Made by @twnsndco
                </a>
              </Span>
            </Grid>
          </Container>
        </div>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(1/2)}`,
          }}
        >
          <div>
            <Breakpoint
              mobile
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  overflowY: 'auto',
                  marginRight: `calc(${rhythm(1)} - 1px)`,
                  position: 'absolute',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.04)',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{
                    marginLeft: 0,
                    marginTop: 0,
                    padding: '4px 0',
                    paddingLeft: rhythm(1),
                    paddingRight: rhythm(1),
                    backgroundColor: '#FFF2C9',
                    border: '1px solid #EDCE6D',
                    borderRadius: '4px 4px 0px 0px',
                    color: '#EAB200',
                    fontSize: '15px',
                  }}
                  className="article"
                >
                  Topics
                </div>
                <ul
                  style={{
                    paddingTop: rhythm(1/2),
                    listStyle: 'none',
                    margin: 0,
                    border: '1px solid #E9E9E9',
                    borderTop: '0',
                    borderRadius: '0px 0px 4px 4px',
                    paddingBottom: `${rhythm(1/2)}`,
                    fontSize: '15px',
                  }}
                >
                  {guidePages}
                </ul>
              </div>
              <div
                style={{
                  marginLeft: `calc(${rhythm(8)} + ${rhythm(1)})`,
                  backgroundColor: '#fff',
                }}
              >
                <div
                  style={{
                    padding: `${rhythm(2)} ${rhythm(2)}`,
                  }}
                >
                  {this.props.children}
                </div>
              </div>
            </Breakpoint>
            <Breakpoint>
              <strong>Topics:</strong>
              {' '}
              <select
                defaultValue={this.props.location.pathname}
                onChange={this.handleTopicChange}
              >
                {docOptions}
              </select>
              <br />
              <br />
              {this.props.children}
            </Breakpoint>
          </div>
        </Container>
      </div>

    )
  },
})
