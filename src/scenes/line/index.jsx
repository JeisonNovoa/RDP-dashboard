import React, { useState } from 'react'; // Importa useState para gestionar el estado
import {
  Box,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
import { tokens } from '../../theme';
import Header from "../../components/Header";
import ChartComponent from '../../components/InteractiveChartValue';

const Line = () => {
  // Inicializa el estado con useState
  const [gameSelected, setGameSelected] = useState('1');
  const [chainSelected, setChainSelected] = useState('1');
  const [timeSelected, setTimeSelected] = useState('32');
  
  const handleGameSelect = (e) => {
    const selectedValue = e.target.value;
    setGameSelected(selectedValue);
    setShowChart(false);
    console.log(selectedValue);
  };

  const handleChainSelect = (e) => {
    const selectedValue = e.target.value;
    setChainSelected(selectedValue);
    setShowChart(false);
    console.log(selectedValue);
  };

  const handleRangeSelect = (e) => {
    const selectedValue = e.target.value;
    setTimeSelected(selectedValue);
    setShowChart(false);
    console.log(selectedValue);
  };
  const [showChart, setShowChart] = useState(false);

  // Handle button click to show ChartComponent
  const handleTrackCoinClick = () => {
    setShowChart(true);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    
    <Box m="20px">
      <Header title="Coin tracker" subtitle="Coin Value" />
      {/* ROW 1 */}
      <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          //alignItems="center"
          //justifyContent="center"
        >
          <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}           
          >
                Select Game
          </Typography>
          <select 
            className="form-control outline-primary" 
            aria-labelledby="game" 
            value={gameSelected}
            onChange={handleGameSelect}
            >
            <option class="dropdown-item" id="game_selected" value="1">EV.io</option>
            <option class="dropdown-item" id="game_selected" value="5">League of Kingdoms</option>
            <option class="dropdown-item" id="game_selected" value="7">Big Time</option>
            <option class="dropdown-item" id="game_selected" value="9">Champions Ascension</option>
            <option class="dropdown-item" id="game_selected" value="2">Axie Infinity </option>
            <option class="dropdown-item" id="game_selected" value="3">The Sandbox</option>
            <option class="dropdown-item" id="game_selected" value="4">Illuvium</option>
            <option class="dropdown-item" id="game_selected" value="6">Castle Crush</option>
            <option class="dropdown-item" id="game_selected" value="8">Castaways</option>
            <option class="dropdown-item" id="game_selected" value="10">Crypto Unicorns</option>
            <option class="dropdown-item" id="game_selected" value="11">Pixels.xyz</option>
            <option class="dropdown-item" id="game_selected" value="12">My Pet Hooligan</option>
          </select>          
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
        >
          <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
          >
                Select Chain
          </Typography>
          <select 
            className="form-control outline-primary" 
            aria-labelledby="chain" 
            value={chainSelected} 
            onChange={handleChainSelect}
          >
            <option class="dropdown-item" id="chain_selected" value="1">USD</option>
            <option class="dropdown-item" id="chain_selected" value="2">Etherium</option>
            <option class="dropdown-item" id="chain_selected" value="3">Bitcoin</option>
            <option class="dropdown-item" id="chain_selected" value="4">Great Britain Pound</option>
            <option class="dropdown-item" id="chain_selected" value="5">European Monetary Unit (Euro)</option>
            <option class="dropdown-item" id="chain_selected" value="6">Japanese yen</option>
          </select>   
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
        >
          <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
          >
                Select Timelapse
          </Typography>
          <select 
            className="form-control outline-primary" 
            aria-labelledby="chain" 
            value={timeSelected} 
            onChange={handleRangeSelect}
            >
            <option class="dropdown-item" id="time_slected" value="8">7 Days</option>
            <option class="dropdown-item" id="time_selected" value="16">15 Days</option>
            <option class="dropdown-item" id="time_selected" value="32">30 Days</option>
          </select>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            type="submit" color="secondary" variant="contained" onClick={handleTrackCoinClick}
          >
            Track Coin           
          </Button>
        </Box>
        {/* ROW 2 */}
      <Box height="75vh">
        { showChart && <ChartComponent chain={chainSelected} coin={gameSelected} range={timeSelected} />}
      </Box>
    </Box>
  );
};

export default Line;
