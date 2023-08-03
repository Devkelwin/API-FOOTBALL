import React from 'react'
import { useState, FormEvent } from 'react'
import '../index/index.css'
import axios from 'axios';
import FlatList from 'flatlist-react';
import { CDATA } from '../../src/data/countryData';
import { LDATA } from '../../src/data/leagueData';
import { TYDATA } from '../../src/data/teamYearData';
import { TCDATA } from '../../src/data/teamChooseData';
import { PTDATA } from '../../src/data/playerTeamData';
import { TSDATA } from '../../src/data/teamStatistics.Data';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export function Page() {

  const [api, setApi] = useState('')

  const [countryData, setCountryData] = useState('')
  const [leaghData, setLeaghData] = useState('')
  const [yearData, setYearData] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teamData, setTeamData] = useState([''])
  const [teamId, setTeamId] = useState('')
  const [leaghId, setLeaghId] = useState('')
  
 
  const [validApi, setValidApi] = useState(false)
  const [validCountry, setValidCountry] = useState(false)
  const [validLeagh, setValidLeagh] = useState(false)
  const [validYear, setValidYear] = useState(false)
  const [validTeam, setValidTeam] = useState(false)
  const [showResult1, setShowResult1] = useState(false)
  const [showResult2, setShowResult2] = useState(false)
  const [showResult3, setShowResult3] = useState(false)


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 1,
       
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        color: '#ffff00'
      },
      title: {
        display: true,
      },
    },
  };
  
  const labels = ['0-15 Minutos', '16-30 Minutos', '31-45 Minutos', '46-60 Minutos', '61-75 Minutos', '76-90 Minutos', '91-105 Minutos', '106-120 Minutos'];
  const data = {
    labels, 
    datasets: [
      {
        label: 'Quantidade de Gols durante a partida',
        data: [TSDATA.response.goals.for.minute['0-15'].total,
        TSDATA.response.goals.for.minute['16-30'].total,
       TSDATA.response.goals.for.minute['31-45'].total,
        TSDATA.response.goals.for.minute['46-60'].total,
        TSDATA.response.goals.for.minute['61-75'].total,
        TSDATA.response.goals.for.minute['76-90'].total,
        TSDATA.response.goals.for.minute['91-105'].total,
        TSDATA.response.goals.for.minute['106-120'].total],
        borderColor: '#fff)',
        backgroundColor: '#fff',
        color: '#ffff00',
        textColor: '#ffff00'
      },
    ],
  };
  
  const renderCountry = (country: any, id: any) => {

    function chooseCountry() {
      setCountryData(country.name)
      setValidCountry(false)
      setValidLeagh(true)
    }

    return (
      <li key={id}>
        <button onClick={chooseCountry} className='w-full h-full bg-gray-700 rounded-md items-center p-2 m-3'>
          <div>
            <h1 className='text-white font-medium text-4xl text-center'>
              {country.name}
            </h1>
          </div>
        </button>
      </li>
    );
  };


  const renderLeague = (league: any, id: any) => {

    function chooseLeague() {
      setLeaghData(league.league.name)
      setLeaghId(league.league.id)
      setValidYear(true)
      setValidLeagh(false)
    }

    return (
      <li key={id}>
        <button onClick={chooseLeague} className='w-full h-full bg-gray-700 rounded-md items-center p-2 m-3'>
          <div>
            <h1 className='text-white font-medium text-4xl text-center '>
              {league.league.name}
            </h1>
          </div>
        </button>
      </li>
    );
  };

  const renderYear = (year: any, id: any) => {

    function chooseYear() {

      setYearData(year)
      setValidTeam(true)
      setValidYear(false)
    }

    return (
      <li key={id}>
        <button onClick={chooseYear} className='w-full h-full bg-gray-700 rounded-md items-center p-2 m-3'>
          <div>
            <h1 className='text-white font-medium text-5xl text-center'>
              {year}
            </h1>
          </div>
        </button>
      </li>
    );
  };

  const renderTeam = (team: any, id: any) => {


    function chooseTeam() {
      setTeamName(team.team.name)
      setTeamId(team.team.id)
      setShowResult1(true)
      setValidTeam(false)
    }

    return (
      <li key={id}>
        <button onClick={chooseTeam} className='w-full h-full bg-gray-700 rounded-md items-center p-2 m-3'>
          <div>
            <h1 className='text-white font-medium text-5xl text-center'>
              {team.team.name}
            </h1>
          </div>
        </button>
      </li>
    );
  };

  const renderPlayer = (player: any, id: any) => {
    const playersNames = player.players.map((res: any) => res.name);

    return (
      <li key={id} className='items-center justify-center flex'>
        <button className='w-96 h-full bg-gray-700 rounded-md items-center p-2 m-3'>
          <div className='flex items-center'>
            <ul className="text-white font-bold text-1xl text-center m-4">
            {playersNames.map((name: any, index: any) => (
      <div key={index}>
        <h1 className='text-center'>{name}</h1>
      </div>
    ))}
            </ul>
          </div>
        </button>
      </li>
    );
  };
 
  const renderStatistics = (league: any, id: any) => {

    const columns: GridColDef[] = [
      { field: 'Quantidade de Jogos', headerName: 'Quantidade de Jogos', width: 230,flex: 1 },
      { field: 'Vitorias', headerName: 'Vitorias', width: 130,flex: 1 },
      { field: 'Empates', headerName: 'Empates', width: 130, flex: 1 },
      {
        field: 'Derrotas',
        headerName: 'Derrotas',
        type: 'number',
        width: 90,
        flex: 1
      },
    ];
  
const rows = [
  {
    id: 1,
    "Quantidade de Jogos": league.response.fixtures.played.total,
    Vitorias: league.response.fixtures.wins.total,
    Empates: league.response.fixtures.draws.total,
    Derrotas: league.response.fixtures.loses.total
  }
]


    return (
      <li key={id}>

<DataGrid
        rows={rows}
        columns={columns}
     
      
       className='bg-WHITE font-bold w-full'
     style={{fontSize: 28,width: 1350, fontWeight: 'bold',height:200}}
      />
      </li>
    );
  };


  function handleapi(event: FormEvent) {
   
    event.preventDefault();
    axios({
      method: 'get',
      url: 'https://v3.football.api-sports.io/status',
      headers: {
        'x-rapidapi-key': api,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    })
      .then(async function (response) {
        const dataacount = response.data.response.account.firstname;

        if(dataacount != null || undefined){
           setApi(api)
        console.log(dataacount)
        setValidApi(true)
        setValidCountry(true)
        console.log(api)
        }
        
      })
      .catch(function (error) {
        console.log(error);
        alert('Chave Invalida')
      }) ;
  }

  
  function handlenext1(event: FormEvent) {
     event.preventDefault();
    axios({
      method: 'get',
      url: 'https://v3.football.api-sports.io/teams/statistics',
      params: {
        team: teamId,
        season: yearData,
        league: leaghId,
      },
      headers: {
        'x-rapidapi-key': api,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    })
      .then(async function (response) {
        const responsepdata = response.data
        
      setTeamData(responsepdata)
      })
      .catch(function (error) {
        console.log(error);
        alert('Chave Invalida')
      });

   
   setShowResult1(false)
   setShowResult2(true)

  }

  
  function handlenext2(event: FormEvent) {
    event.preventDefault();
    setShowResult2(false)
    setShowResult3(true)

  }

  function handlenext3(event: FormEvent) {
    event.preventDefault();
    setShowResult3(false)
    setValidApi(false)

  }


  return (

    <div className='bg-GRAY_600 ' >
      <div hidden={validApi} >


        <h1 className=' font-bold mb-4'>Insira sua API-Football</h1>

        <form onSubmit={handleapi} className='columns-1'>
          <input
            className='bg-WHITE text-gray-900 w-96 h-12 rounded-md text-lg font-medium text px-2'
            type='text'
            value={api}
            onChange={(e) => setApi(e.target.value)}
          />
          <button type='submit' className='bg-green-600 m-10 h-12 w-28 ' >
            Enviar
          </button>
        </form>
      </div>
      <div >


        <ul hidden={!validCountry}>
          <h1 className='text-center text-7xl font-bold mt-8 '>Escolha um País</h1>
          <FlatList
            list={CDATA.response}
            renderItem={renderCountry}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
        </ul>



        <ul hidden={!validLeagh}>
          <h1 className='text-center text-7xl font-bold mt-8 mb-4'>Escolha um Campeonato</h1>
          <FlatList
            list={LDATA.response}
            renderItem={renderLeague}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
        </ul>



        <ul hidden={!validYear}>
          <h1 className='text-center text-7xl font-bold mt-8 mb-4'>Escolha um Ano</h1>
          <FlatList
            list={TYDATA.response}
            renderItem={renderYear}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
        </ul>


        <ul hidden={!validTeam}>
          <h1 className='text-center text-7xl font-bold mt-8 mb-4'>Escolha um Time</h1>
          <FlatList
            list={TCDATA.response}
            renderItem={renderTeam}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
        </ul>


        <div hidden={!showResult1} >

         
          <h1 className='text-center text-8xl font-bold mt-8 mb-4 '>Jogadores:</h1>


          <ul>
            <FlatList
              list={PTDATA.response}
              renderItem={renderPlayer}
              renderWhenEmpty={() => <div>List is empty!</div>}
            />
          </ul>
          <button type='button' onClick={handlenext1} className='bg-green-600 m-10 h-12 w-50 ' >
            Próximo
          </button>
  </div>



  <div hidden={!showResult2}>
      <h1 className='text-center text-7xl font-bold mt-40 mb-10'> Estatisticas do Time:</h1>
          <ul className='items-center justify-center flex'>
            <FlatList
              list={[TSDATA]}
              renderItem={renderStatistics}
              renderWhenEmpty={() => <div>List is empty!</div>}
            />
          </ul>
  
          <button type='button' onClick={handlenext2} className='bg-green-600 m-10 h-12 w-28 ' >
            Próximo
          </button>
  </div>
        

{
  showResult3 &&
  <view>
        <h1 className='text-center text-7xl font-bold mt-40 mb-4'> Gráfico dos momentos do jogo o time marca seus gols:</h1>       
    <div className='flex items-center justify-center'>
        <Bar options={options} data={data}  style={{width:1120}}/>;
    </div>
        <button type='button' onClick={handlenext3} className='bg-green-600 m-10 h-12 w-28 ' >
          Reiniciar
        </button>
  </view>
    
}

      </div>

    </div>

  )
}

