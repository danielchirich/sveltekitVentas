<script>
  import { supabase } from './conexion.js';
  import _, { sortBy, pluck } from 'underscore';
  import {onMount} from 'svelte'
  //import { createClient } from '@supabase/supabase-js'
  //import {onMount} from 'svelte'
  
  
  let selected 
  
 async function getData() {
	  const { data, error } = await supabase.from('Productos')
  .select()

  
		if (error) throw new Error(error.message)
    return data
	}

  async function getDataPrecios() {
	  const { data, error } = await supabase.from('Precios')
    .select()    
		if (error) throw new Error(error.message)
    console.log(data)
		return data
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
   // tengo que armar un filter por cliente
</script>




<header class="text-gray-600 body-font">
  <ul class="flex border-b">
    <li class="-mb-px mr-1">
      <a class="bg-green-300 inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-800 font-semibold" href="/">Productos</a>
    </li>
    <li class="mr-1">
      <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/formulario">Cargar Venta</a>
    </li>
    <li class="mr-1">
      <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/modificarVenta">Modificar Venta</a>            
    </li>
  <li class="mr-1">
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
        <h2 class="text-gray-900 text-lg title-font font-medium mb-2">Productos Listado por Cliente</h2>
        <p class="leading-relaxed text-base">Al acceder al Select de cada Cliente se verán sus productos con sus ventas.</p>
        <select bind:value={selected}>
            {#each opcionesSort as item}
			          <option value={item}>
                  {item}				           
			          </option>
		        {/each}
            </select>
      </div>
    </div>

  {#await getData()}
        <p>Fetching data...</p>
   {:then data}
         {#each data as item}

   <!-- content here -->
              {#if `${item.cliente}` == selected}  
    
      <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
        <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0"> 
             
            <h2 class="text-sm title-font text-gray-500 tracking-widest">{item.id}</h2>          
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{item.cliente}</h1>        
         
          
          <div class="flex border-t border-gray-200 py-2">
            <span class="text-gray-500">Código 1</span>
            <span class="ml-auto text-gray-900">{item.codigo1}</span>
          </div>
          <div class="flex border-t border-gray-200 py-2">
            <span class="text-gray-500">Código 2</span>
            <span class="ml-auto text-gray-900">{item.codigo2}</span>
          </div>
          <div class="flex border-t border-b mb-6 border-gray-200 py-2">
            <span class="text-gray-500">Contenido</span>
            <span class="ml-auto text-gray-900">{item.contenido}</span>
          </div>          
        </div>
       
        <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">

          <table class="table-auto w-full text-left whitespace-no-wrap">
                               <thead>
                                  <tr>
                                     <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">Id</th>
                                     <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">Fecha</th>
                                     <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Cantidad</th>                                
                                     <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Precio</th>                                
                                  </tr>
                               </thead>
            
                {#await getDataPrecios()}
                   <p>Fetching data...</p>
                   {:then data}
                     {#each data as i}
                           {#if `${item.id}` == `${i.idProducto}`}
                           
                               <tbody>
                                   <tr>
                                       <td class="px-4 py-3">{i.id}</td>
                                       <td class="px-4 py-3">{i.created_at}</td>
                                       <td class="px-4 py-3">{i.cantidad} unid.</td>
                                       <td class="px-4 py-3">{i.precio}</td>
                                                        
                                    </tr>
                  
                              </tbody>
                           {/if}                         
                     {/each}
                     
                     {:catch error}
                         <p>Algo está mal:</p>
                         <pre>{error}</pre>
                     {/await}                
              </table> 
        </div>   
      </div>  
   
  {/if}  
     
  {/each}  
  {:catch error}
        <p>Something went wrong while fetching the data:</p>
        <pre>{error}</pre>
  {/await}
</div>
</section>  
  