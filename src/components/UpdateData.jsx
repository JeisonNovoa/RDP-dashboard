import React, { useEffect, useState } from 'react';
import { box , useTheme , IconButton } from '@mui/material';
import { tokens } from "../theme";
import Box from '@mui/material/Box'; // Importa el componente Box para mostrar el resultado.
import UpdateIcon from '@mui/icons-material/Update';
const InterfaceComponent = ({ GameID , CoinID ,CoinURL, ChartURL, EndpointCoin, EndpointChart, type ,isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('ok');
  const fetchData = async () => {
    if (type == "coin"){
        try {
            const response = await fetch(ChartURL);
            const data = await response.json();
            const rubber_to_chart = [{ 
                close_val: parseFloat(data.market_data.current_price.usd),
                volume: parseFloat(data.market_data.total_volume.usd),
                high: parseFloat(data.market_data.high_24h.usd),
                chain_id: 1,
                Liquity: parseFloat(data.liquidity_score),
                coin_id: parseInt(CoinID),
            }];
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
            const rubber_to_chart = [{ 
                close_val: parseFloat(data.market_cap.usd),
                volume: parseFloat(data.volume_24h.usd),
                high: 0,
                chain_id: 1,
                Liquity: 0,
                coin_id: parseInt(CoinID),
            }];
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
  };

  
  const color = status === 'Error' ? colors.redAccent[500] : colors.greenAccent[500];
  //<button  onClick={ postData} starticon={< UpdateIcon />} >Refresh</button> }
  return (
    <Box color={color} icon={< UpdateIcon />}>
      {status}
      {/* Agrega un botón para enviar datos POST */}
      
      <IconButton type="button" sx={{ p: 1 }} onclick={postData} >
          <UpdateIcon />
        </IconButton>
    </Box>
  );
};

export default InterfaceComponent;
