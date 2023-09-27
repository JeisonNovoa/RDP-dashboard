// BarComponent.js
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { tokens } from "../theme";
const BarComponent = ({ chain, coin, range , isCustomLineColors = false, isDashboard = false } ) => {
  // Use the received props to construct your URLs
  const url = new URL('http://localhost:8080/api/chart/');
  const link_close = `${url}${chain}/${coin}/${range}/mapped`;
  const link_vol = `${url}${chain}/${coin}/${range}/volume/mapped`;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(link_vol);
        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos');
        }
        //const data_API = await response.json();
        const data = await response.json();
        setChartData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No se pudo cargar la gráfica</div>;
  }

  return (
    <ResponsiveBar
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
                stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill:  colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke:  colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill:  colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill:  colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        }
      }}
      keys={['y']}
      indexBy="x"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -20,
        legend: isDashboard ? undefined : 'Date',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'value',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ': ' + e.formattedValue + ' in category: ' + e.indexValue;
      }}
    />
  );
};

export default BarComponent;
