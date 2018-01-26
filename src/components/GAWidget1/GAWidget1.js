import React from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, ButtonGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/GAWidget1/GAWidget1.scss';

;(function(w, d, s, g, js, fjs) {
  g = w.gapi || (w.gapi = {})
  g.analytics = {
    q: [],
    ready: function(cb) {
      this.q.push(cb)
    }
  }
  js = d.createElement(s)
  fjs = d.getElementsByTagName(s)[0]
  js.src = "https://apis.google.com/js/platform.js"
  fjs.parentNode.insertBefore(js, fjs)
  js.onload = function() {
    g.load("analytics")
  }
})(window, document, "script")

const CHARTS = [
  [
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:sessions",
        "start-date": "1daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last day sessions",
          width: '100%'
        }
      }
    },
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:sessions",
        "start-date": "7daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last week sessions",
          width: '100%'
        }
      }
    },
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:sessions",
        "start-date": "30daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last month sessions",
          width: '100%'
        }
      }
    },
  ],
  [
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:users",
        "start-date": "1daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last day sessions",
          width: '100%'
        }
      }
    },
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:users",
        "start-date": "7daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last week sessions",
          width: '100%'
        }
      }
    },
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:users",
        "start-date": "30daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last month sessions",
          width: '100%'
        }
      }
    },
  ],
  [
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:newUsers",
        "start-date": "1daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last day sessions",
          width: '100%'
        }
      }
    },
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:newUsers",
        "start-date": "7daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last week sessions",
          width: '100%'
        }
      }
    },
    {
      reportType: "ga",
      query: {
        dimensions: "ga:date",
        metrics: "ga:newUsers",
        "start-date": "30daysAgo",
        "end-date": "yesterday"
      },
      chart: {
        type: "LINE",
        options: {
          title: "Last month sessions",
          width: '100%'
        }
      }
    },
  ]
]

const tabs = [
  {
    title: 'Total sessions',
    buttons: ['Day', 'Week', 'Month']
  },
  {
    title: 'Returning Users',
    buttons: ['Day', 'Week', 'Month']
  },
  {
    title: 'New Users',
    buttons: ['Day', 'Week', 'Month']
  }
]
// App credential in the google developer console
const CLIENT_ID = "<client-id>"
const ga = "ga:<view-id>"

definejs('GAWidget1', function create (){

    return {
        createComponent: function (React, Component) {
          	return class GAWidget1 extends Component {

							constructor (props){
								super(props);
								this.state = {
									mode: this.props.mode,
									isEditing: this.props.mode == 'edit' ? true : false,
                  ids: ga,
                  activeChart: [0, 0, 0]
								}
							}

              handleClick = (tab, index) => {
                const activeChart = this.state.activeChart
                activeChart[tab] = index
                this.setState({activeChart})
              }

							render() {

								let widgetStyle = {
									textAlign : this.props.widgetStyle.textAlign,
									fontWeight : this.props.widgetStyle.isBold ? 'bold' : 'normal',
									color : this.props.widgetStyle.textColor,
									fontStyle : this.props.widgetStyle.isItalic ? 'italic' : 'normal',
									fontFamily : this.props.widgetStyle.fontFamily,
									fontSize : this.props.widgetStyle.fontSize
								}

                const views = {
                  query: {
                    ids: this.state.ids
                  }
                }

								return(
									<div style={{display: 'block', width: 400, margin:0, padding: 10}}>
										<GoogleProvider clientId={CLIENT_ID}>
                      <div style={{marginTop: 10}}>
                        <Tabs>
                          <TabList>
                            {tabs.map((tab, i) => (<Tab key={i}>{tab.title}</Tab>))}
                          </TabList>
                          {tabs.map((tab, i) => (
                              <TabPanel key={i}>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                  <ButtonGroup size="xs" color="secondary">
                                    {tab.buttons.map((title, index) =>
                                      (<Button
                                        key={index}
                                        outline
                                        onClick={() => this.handleClick(i, index)}
                                        active={index === this.state.activeChart[i]}
                                        style={{height: 24}}>
                                        {title}
                                      </Button>))
                                    }
                                  </ButtonGroup>
                                </div>
                                <GoogleDataChart
                                  views={views}
                                  update={this.state.activeChart[i]}
                                  config={CHARTS[i][this.state.activeChart[i]]}
                                />
                              </TabPanel>
                            ))
                          }
                        </Tabs>
                      </div>
										</GoogleProvider>
									</div>
								)
							}
						}
        }
    };
});

// dont wait for auth twice, even after unmounts
let isLoaded = false;

// wait for auth to display children
export class GoogleProvider extends React.Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    this.init();
  }
  init = () => {
    const doAuth = () => {
      gapi.analytics.auth &&
      gapi.analytics.auth.authorize({
        clientid: this.props.clientId,
        container: this.authButtonNode,
      });
    };
    gapi.analytics.ready(a => {
      if (isLoaded) {
        this.setState({
          ready: true,
        });
        return;
      }
      gapi.analytics.auth.on('success', response => {
        this.setState({
          ready: true,
        });
      });
      doAuth();
    });
  };
  render() {
    return (
      <div>
        <div ref={node => (this.authButtonNode = node)} />
        {this.state.ready && this.props.children}
      </div>
    );
  }
}

// single chart
export class GoogleDataChart extends React.Component {
  componentDidMount() {
    this.loadChart();
  }
  componentWillReceiveProps(nextProps) {
    this.loadChart(nextProps)
  }
  loadChart = (props = this.props) => {
    const config = {
      ...props.config,
      chart: {
        ...props.config.chart,
        container: this.chartNode,
      },
    };
    this.chart = new gapi.analytics.googleCharts.DataChart(config);
    this.chart.set(props.views).execute();
  };
  render() {
    return (
      <div className={this.props.className} style={this.props.style} ref={node => (this.chartNode = node)} />
    );
  }
}