import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification'
import { useNavigate, useParams } from 'react-router-dom'
import ShipmentPriority from '../../models/ShipmentPriority'
import getValidationMessages from '../../utils/getValidationMessages'

export default function ShipmentPriorityForm() {
  const API_PATH = '/shipment_priorities'

  const navigate = useNavigate()
  const params = useParams()

  const [state, setState] = React.useState({
    shipmentPriority: {
      description: ''
    },
    errors: {},
    showWaiting: false,
    notif: {
      show: false,
      severity: 'success',
      message: ''
    }
  })
  const {
    shipmentPriority,
    errors,
    showWaiting,
    notif
  } = state

  function handleFormFieldChange(event) {
    const shipmentPriorityCopy = {...shipmentPriority}
    shipmentPriorityCopy[event.target.name] = event.target.value
    setState({...state, shipmentPriority: shipmentPriorityCopy})
  }

  function handleFormSubmit(event) {
    event.preventDefault()    // Evita que a página seja recarregada
    // Envia os dados para o back-end
    sendData()
  }

  React.useEffect(()=>{
    if(params.id) fetchData()
  },[])

  async function fetchData(){
    setState({...state, showWaiting: true, errors:{}})
    try{
      const result = await myfetch.get(`${API_PATH}/${params.id}`)
      setState({
        ...state,
        shipmentPriority: result,
        showWaiting: false
      })
    }
    catch(error){
      console.error(error)
      setState({
        ...state,
        showWaiting: false,
        errors: errorMessages,
        notif:{
          severity: 'error',
          show: true,
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  async function sendData() {
    setState({...state, showWaiting: true, errors: {}})
    try {
      
      // Chama a validação da biblioteca Joi
      await ShipmentPriority.validateAsync(shipmentPriority, { abortEarly: false })

      if (params.id) await myfetch.put(`${API_PATH}/${params.id}`, shipmentPriority)
      
      // Registro não existe: chama POST para criar
      else await myfetch.post(API_PATH, shipmentPriority)      
      setState({
        ...state, 
        showWaiting: false,
        notif: {
          severity: 'success',
          show: true,
          message: 'Item salvo com sucesso'
        }
      })
    }
    catch(error) {
      const { validationError, errorMessages } = getValidationMessages(error)

      console.error(error)
      
      setState({
        ...state, 
        showWaiting: false,
        errors: errorMessages,
        notif: {
          severity: 'error',
          show: !validationError,
          message: 'ERRO: ' + error.message
        }
      })
    }
  }

  function handleNotifClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    
    // Se o item foi salvo com sucesso, retorna à página de listagem
    if(notif.severity === 'success') navigate(-1)

    setState({ ...state, notif: { ...notif, show: false } })
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showWaiting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Notification 
        show={notif.show}
        severity={notif.severity}
        onClose={handleNotifClose}
      >
        {notif.message}
      </Notification>
      
      <PageTitle 
        title={params.id ? "Editar prioridade de envio" : "Cadastrar nova prioridade de envio"} 
        />

      <div>{notif.severity}</div>

      <form onSubmit={handleFormSubmit}>
        <TextField 
          label="Descrição" 
          variant="filled"
          fullWidth
          required
          name="description"  // Nome do campo na tabela
          value={shipmentPriority.description}   // Nome do campo na tabela
          onChange={handleFormFieldChange}
          error={errors?.description}
          helperText={errors?.description}
        />
        <Fab 
          variant="extended" 
          color="secondary"
          type="submit"
        >
          <SendIcon sx={{ mr: 1 }} />
          Enviar
        </Fab>

      </form>
    </>
  )
}