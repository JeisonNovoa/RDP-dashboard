import React, { useEffect, useState } from 'react';
import { useTheme , IconButton } from '@mui/material';
import { tokens } from "../theme";
import Box from '@mui/material/Box';
import UpdateIcon from '@mui/icons-material/Update';
const InterfaceComponent = ({ GameID , CoinID ,CoinURL, ChartURL, EndpointCoin, EndpointChart, type ,isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('ok');
  const fetchData = async () => {
    if (type === "coin"){
        try {
            const response = await fetch(ChartURL);
            const data = await response.json();
            const rubber_to_chart = [
              { 
                close_val: parseFloat(data.market_data.current_price.usd),
                volume: parseFloat(data.market_data.total_volume.usd),
                high: parseFloat(data.market_data.high_24h.usd),
                chain_id: 1,
                Liquity: parseFloat(data.liquidity_score),
                coin_id: parseInt(CoinID),
              },
              { 
                close_val: parseFloat(data.market_data.current_price.eth),
                volume: parseFloat(data.market_data.total_volume.eth),
                high: parseFloat(data.market_data.high_24h.eth),
                chain_id: 2,
                Liquity: parseFloat(data.liquidity_score),
                coin_id: parseInt(CoinID),
              },
              { 
                close_val: parseFloat(data.market_data.current_price.btc),
                volume: parseFloat(data.market_data.total_volume.btc),
                high: parseFloat(data.market_data.high_24h.btc),
                chain_id: 3,
                Liquity: parseFloat(data.liquidity_score),
                coin_id: parseInt(CoinID),
              },
              { 
                close_val: parseFloat(data.market_data.current_price.gbp),
                volume: parseFloat(data.market_data.total_volume.gbp),
                high: parseFloat(data.market_data.high_24h.gbp),
                chain_id: 4,
                Liquity: parseFloat(data.liquidity_score),
                coin_id: parseInt(CoinID),
              },
              { 
                close_val: parseFloat(data.market_data.current_price.eur),
                volume: parseFloat(data.market_data.total_volume.eur),
                high: parseFloat(data.market_data.high_24h.eur),
                chain_id: 5,
                Liquity: parseFloat(data.liquidity_score),
                coin_id: parseInt(CoinID),
              },
              { 
                close_val: parseFloat(data.market_data.current_price.jpy),
                volume: parseFloat(data.market_data.total_volume.jpy),
                high: parseFloat(data.market_data.high_24h.jpy),
                chain_id: 6,
                Liquity: parseFloat(data.liquidity_score),
                coin_id: parseInt(CoinID),
              },
          ];
            console.log(rubber_to_chart);
            setChartData(rubber_to_chart);
            setLoading(false);
        } catch (error) {
        console.error(`Error fetching data from ${ChartURL}:`, error);
        setLoading(false);
        // Cambia el estado 'status' a "Error" en caso de error.
        setStatus('Error');
        }
    }
    else{
        try {
            const response = await fetch(ChartURL);
            const data = await response.json();
            const rubber_to_chart = [
              {
                close_val: parseFloat(data.market_cap.usd),
                volume: parseFloat(data.volume_24h.usd),
                high: 0,
                chain_id: 1,
                Liquity: 0,
                coin_id: parseInt(CoinID),
              }
            ];
            console.log(rubber_to_chart);
            setChartData(rubber_to_chart);
            setLoading(false);
        } catch (error) {
        console.error(`Error fetching data from ${ChartURL}:`, error);
        setLoading(false);
        // Cambia el estado 'status' a "Error" en caso de error.
        setStatus('Error');
        }
    }


  };

  // Llama a fetchData() cuando el componente se monta.
  useEffect(() => {
    fetchData();
  }, [ChartURL]);

  const postData = async () => {
    if (type == "coin"){
      try {
        const response = await fetch(EndpointChart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chartData[0]), // Envía los datos del gráfico en el cuerpo de la solicitud.
        });
        console.log(response)
        // Aquí puedes manejar la respuesta POST si es necesario.
      } catch (error) {
        console.error(`Error posting data to ${EndpointChart}:`, error);
        // Maneja el error de la solicitud POST si es necesario.
      }
      try {
        const response = await fetch(EndpointChart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chartData[1]), // Envía los datos del gráfico en el cuerpo de la solicitud.
        });
        console.log(response)
        // Aquí puedes manejar la respuesta POST si es necesario.
      } catch (error) {
        console.error(`Error posting data to ${EndpointChart}:`, error);
        // Maneja el error de la solicitud POST si es necesario.
      }
      try {
        const response = await fetch(EndpointChart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chartData[2]), // Envía los datos del gráfico en el cuerpo de la solicitud.
        });
        console.log(response)
        // Aquí puedes manejar la respuesta POST si es necesario.
      } catch (error) {
        console.error(`Error posting data to ${EndpointChart}:`, error);
        // Maneja el error de la solicitud POST si es necesario.
      }
      try {
        const response = await fetch(EndpointChart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chartData[3]), // Envía los datos del gráfico en el cuerpo de la solicitud.
        });
        console.log(response)
        // Aquí puedes manejar la respuesta POST si es necesario.
      } catch (error) {
        console.error(`Error posting data to ${EndpointChart}:`, error);
        // Maneja el error de la solicitud POST si es necesario.
      }
      try {
        const response = await fetch(EndpointChart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chartData[4]), // Envía los datos del gráfico en el cuerpo de la solicitud.
        });
        console.log(response)
        // Aquí puedes manejar la respuesta POST si es necesario.
      } catch (error) {
        console.error(`Error posting data to ${EndpointChart}:`, error);
        // Maneja el error de la solicitud POST si es necesario.
      }
      try {
        const response = await fetch(EndpointChart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chartData[5]), // Envía los datos del gráfico en el cuerpo de la solicitud.
        });
        console.log(response)
        // Aquí puedes manejar la respuesta POST si es necesario.
      } catch (error) {
        console.error(`Error posting data to ${EndpointChart}:`, error);
        // Maneja el error de la solicitud POST si es necesario.
      }
    }
    else {
      try {
        const response = await fetch(EndpointChart, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(chartData[0]), // Envía los datos del gráfico en el cuerpo de la solicitud.
        });
        console.log(response)
        // Aquí puedes manejar la respuesta POST si es necesario.
      } catch (error) {
        console.error(`Error posting data to ${EndpointChart}:`, error);
        // Maneja el error de la solicitud POST si es necesario.
      }
    }
  };

  
  const color = status === 'Error' ? colors.redAccent[500] : colors.greenAccent[500];
  //<button  onClick={ postData} starticon={< UpdateIcon />} >Refresh</button> }
  return (
    <Box color={color} icon={< UpdateIcon />}>
      <Box>
      Status: {status}
      </Box>
      {/* Agrega un botón para enviar datos
       <Button
            type="submit" color="secondary" variant="contained" onClick={postData}
      >
      Refresh Data        
      </Button>
      POST 
      jaja , no descomentar
      */}
     
      <IconButton type="button" sx={{ p: 1 }} onclick={postData} >
          <UpdateIcon />
        </IconButton>
    </Box>
  );
};

export default InterfaceComponent;
