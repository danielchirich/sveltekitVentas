<script>
  import { supabase } from './conexion.js';
  import _, { reduce, pluck } from 'underscore';
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
  $: listaPagos = _.pluck(alldataPagos, 'importePago')
  $: pagosTot = _.reduce(listaPagos, function(x, num){ return x + num; }, 0);

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
  $: listaFactura = _.pluck(alldataFactura, 'importeFactura')
  $: facturaTot = _.reduce(listaFactura, function(x, num){ return x + num; }, 0);

  onMount(()=>{
      getdataClientes()
  })
  async function getdataClientes(){
     await supabase
       .from('Clientes')
       .select().then((res)=>{
          alldataClientes = res.data
    }) 
  }
  $: opciones = _.pluck(alldataClientes, 'cliente') 
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
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/formPagos">Cargar Pago</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/formFactura">Cargar Factura</a>
      </li>
      <li class="mr-1">
        <a class="bg-green-300 inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-800 font-semibold" href="/detallePagos">Detalle Pagos</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/saldos">Saldos</a>
      </li>
      
    </ul>
  
  </header>


  <section class="text-gray-600 body-font">
    <div class="container px-2 py-24 mx-auto">
  
      <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
        <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
          <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Detalle de Estado de cuenta por Cliente</h2>
          <p class="leading-relaxed text-base">Select Cliente:</p>
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
  </section>  
            
  
  
  <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">     
        <div class="flex flex-wrap -m-4">
  
          <div class="p-4 md:w-1/2 w-full">
  
            <div class="h-full bg-gray-100 p-8 rounded">            
              <table class="table-auto w-full text-left whitespace-no-wrap">
                <caption>
                  <h1 class="text-2xl font-medium title-font text-red-500 mb-12 text-center">Pagos</h1>
                </caption>
                  <thead>
                    <tr>
                     
                      <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Fecha</th>
                      <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Cliente</th>
                      <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Importe</th>
                      <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                    </tr>
                  </thead>
                  {#each alldataPagos as item}
                         {#if selected == item.cliente}                       
                  <tbody>                                   
                    <tr>
                      
                      <td class="px-4 py-3">{item.fecha}</td>
                      <td class="px-4 py-3">{item.cliente}</td>
                      <td class="px-4 py-3 text-lg text-gray-900">{item.importePago}</td>                      
                    </tr>                      
                  </tbody>                 
                         {/if}                                    
                    {/each}
                </table>                
            </div>
                 
          </div>
       
               <!-- Segunda Columna -->
         
          <div class="p-4 md:w-1/2 w-full">
  
            <div class="h-full bg-gray-100 p-8 rounded">            
             <table class="table-auto w-full text-left whitespace-no-wrap">
              <caption>
                <h1 class="text-2xl font-medium title-font text-green-500 mb-12 text-center">Facturas</h1>
              </caption>
          <thead>
            <tr>
              
              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Fecha</th>
              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Cliente</th>
              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Cant.</th>
              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Descrip.</th>
              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">P.Unit.</th>
              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Importe</th>
              
            </tr>
          </thead>
               {#each alldataFactura as item}
                    {#if selected == item.cliente}
          <tbody>
            
            <tr>            
              <td class="px-2 py-3">{item.created_at}</td>
              <td class="px-2 py-3">{item.cliente}</td>
              <td class="px-2 py-3 text-lg text-gray-900">{item.cantidad}</td>
              <td class="px-2 py-3">{item.desc}</td>
              <td class="px-2 py-3">{item.precioUnit}</td>
              <td class="px-2 py-3 text-lg text-gray-900">{item.importeFactura}</td>            
            </tr>          
          </tbody>
                     {/if}
             {/each}
        </table>      
            </div>        
          </div>
        </div>      
      </div>
    </section>