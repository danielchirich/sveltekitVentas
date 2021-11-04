<script>
  import { supabase } from './conexion.js';
  import _, { reduce, pluck, where } from 'underscore';
  import {onMount} from 'svelte'

  let alldataPagos = []
  let alldataFactura = []
  let alldataClientes = []
  let selected

  onMount(()=>{
      dataPagos()
  })
  async function dataPagos(){
     await supabase
       .from('Pagos')
       .select().then((res)=>{
          alldataPagos = res.data
    }) 
  }
  
  onMount(()=>{
      dataFactura()
  })
  async function dataFactura(){
     await supabase
       .from('Facturacion')
       .select().then((res)=>{
          alldataFactura = res.data
    }) 
  }
  

  onMount(()=>{
      dataClientes()
  })
  async function dataClientes(){
     await supabase
       .from('Clientes')
       .select().then((res)=>{
          alldataClientes = res.data
    }) 
  }
  $: opciones = _.pluck(alldataClientes, 'cliente') 
  $: opcionesSort = _.sortBy(opciones)

// Filtrar Clientes en el Pago
  $: filtrarClientePagos = _.where(alldataPagos, {cliente: selected});
  $: listaPagos = _.pluck(filtrarClientePagos, 'importePago')
  $: totalPagos = _.reduce(listaPagos, function(x, num){ return x + num; }, 0);

  //Filtrar Clientes en la Factura
  $: filtrarClienteFactura = _.where(alldataFactura, {cliente: selected});
  $: listaFactura = _.pluck(filtrarClienteFactura, 'importeFactura')
  $: totalFactura = _.reduce(listaFactura, function(x, num){ return x + num; }, 0);
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
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/formPagos">Cargar Pago</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/formFactura">Cargar Factura</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/detallePagos">Detalle Pagos</a>
      </li>
      <li class="mr-1">
        <a class="bg-green-300 inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-800 font-semibold" href="/saldos">Saldos</a>
      </li>
      
    </ul>
  
  </header>


  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
        <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
          <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Seleccionar Cliente</h2>
          <div class="flex border-t border-gray-200 py-2">
            <select bind:value={selected}>
            {#each opcionesSort as item}
                <option value={item}>
                  {item}				           
                </option>
            {/each}
            </select>
          </div>
          
        </div>
      </div>
      <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
          <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Saldos</h2>
          <p class="leading-relaxed text-base"> Total Facturas  <strong>{selected}</strong>: <strong>{totalFactura}</strong></p>
          <p class="leading-relaxed text-base"> Total Pagos <strong>{selected}</strong>: <strong>{totalPagos}</strong></p>
          
        </div>
        <div class="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
          </svg>
        </div>
      </div>
      <div class="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
        <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
          <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Saldo Total</h2>
          <p class="leading-relaxed text-base"><strong>Saldo Total: {totalFactura - totalPagos}</strong></p>
          
        </div>
      </div>
     
    </div>
  </section>