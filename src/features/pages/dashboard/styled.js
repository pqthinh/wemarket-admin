import styled from 'styled-components'
import { Panel } from 'rsuite'

export const Container = styled(Panel)`
  height: 100%;
  overflow: auto !important;
  & .header {
    .rs-panel {
      background: #fff;
    }
    .chart-img {
      width: 100px;
      position: absolute;
      left: 26px;
      top: 34px;
    }
    .trend-box {
      .rs-panel-body {
        text-align: right;
        .value {
          font-size: 36px;
        }
      }
    }
  }

  .colorful-chart {
    color: #fff;
    margin-top: 30px;
    border-radius: 6px;
    h3 {
      line-height: 22px;
      text-align: right;
      color: rgba(255, 255, 255, 0.5);
      padding: 10px;
    }
  }

  .ct-chart-magenta {
    background: linear-gradient(60deg, #ec407a, #d81b60) !important;
    .ct-label {
      color: #eee !important;
    }
    .ct-series-a {
      .ct-bar,
      .ct-slice-donut,
      .ct-line,
      .ct-point {
        stroke: #eee !important;
      }
    }
    .ct-grid {
      stroke: hsla(0, 0%, 100%, 0.2) !important;
    }
  }

  .ct-chart-orange {
    background: linear-gradient(60deg, #ffa726, #fb8c00) !important;
    .ct-label {
      color: #eee;
    }
    .ct-series-a {
      .ct-bar,
      .ct-slice-donut,
      .ct-line,
      .ct-point {
        stroke: #eee;
      }
    }
    .ct-grid {
      stroke: hsla(0, 0%, 100%, 0.2);
    }
  }

  .ct-chart-azure {
    background: linear-gradient(60deg, #26c6da, #00acc1) !important;
    .ct-label {
      color: #eee;
    }
    .ct-series-a {
      .ct-bar,
      .ct-slice-donut,
      .ct-line,
      .ct-point {
        stroke: #eee;
      }
    }
    .ct-grid {
      stroke: hsla(0, 0%, 100%, 0.2);
    }
  }

  .simple-chart {
    background: #f0f0f0;
    margin-top: 30px;
    border-radius: 6px;
    h3 {
      line-height: 22px;
      padding: 20px;
    }
    .ct-chart-pie {
      .ct-label {
        color: #fff;
        fill: #fff;
      }
      .ct-series {
        &-a .ct-slice-pie {
          fill: #42c2dc;
        }
        &-b .ct-slice-pie {
          fill: #13ba9e;
        }

        &-c .ct-slice-pie {
          fill: #a873e6;
        }
        &-d .ct-slice-pie {
          fill: #1464ac;
        }
      }
    }
  }
`
