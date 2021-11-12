<script>
  import { supabase } from './conexion.js';
  import _, { where, pluck, sortBy } from 'underscore';
  import {onMount} from 'svelte'
  
    
   let importePago
   let submit = false     
   let selected

   

    async function sendData() {
     const { data, error } = await supabase
    .from('Pagos')
    .insert([
      { 'cliente': selected,          
        'importePago': importePago

     }
    ])          
    }
  
  let alldata = []
  onMount(()=>{
    getdataClientes()
  })
  async function getdataClientes(){
    await supabase
     .from('Clientes')
     .select().then((res)=>{
        alldata = res.data
  }) 
}
   $: opciones = _.pluck(alldata, 'cliente')
   $: opcionesSort = _.sortBy(opciones) 
</script>


<header class="text-gray-600 body-font">
    <ul class="flex border-b">
      <li class="-mb-px mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/">Productos</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/formulario">Cargar Venta</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/modificarVenta">Modificar Venta</a>            
      </li>
      <li class="mr-1">
        <a class="bg-green-300 inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-800 font-semibold" href="/formPagos">Cargar Pago</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/formFactura">Cargar Factura</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/detallePagos">Detalle Pagos</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/saldos">Saldos</a>
      </li>
      
    </ul>
  
  </header>


  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-2xl  text-gray-700">Pagos</h2>          
      </div>

      <div class="rounded bg-gray-300 max-w-md rounded overflow-hidden shadow-xl p-5">
          
        <form on:submit|preventDefault={() => submit = true}>
          <div class="relative mb-4">
            <label for="Cliente" class="leading-7 text-sm text-gray-600">Cliente</label>
            <select bind:value={selected} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                    {#each opcionesSort as item}
                        <option value={item}>
                            {item}				           
                        </option>
                    {/each}
            </select>
          </div> 
          <div class="relative mb-4">
            <label for="importe" class="leading-7 text-sm text-gray-600">Importe</label>
            <input bind:value={importePago}  id="importe" name="importe" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
          </div>

          <div class="relative mb-4">
             <br/>
            <input type=submit value="Enviar" on:click={() => submit = false}  class="w-full text-white bg-indigo-800 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          </div>
          <p class="text-xs text-gray-800 mt-3">Lo encontré sentado en la entrada, pensativo, y casi triste.</p>
          </form>
          {#if submit}
          {#await sendData()}
              <p>Sending data...</p>
          {:then data}
              <p>Succesfully sent data.</p>
          {:catch error}
                 <p>Something went wrong while sending the data:</p>
                 <pre>{error}</pre>
          {/await}
          {/if}       
      </div>
    </div>
  </div>
  
  