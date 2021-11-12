<script>
  import { supabase } from './conexion.js';
  import _, { where, pluck, sortBy } from 'underscore';

  
 async function getData() {
	  const { data, error } = await supabase.from('Productos')
  .select()
		if (error) throw new Error(error.message)
    console.log(data)
		return _.sortBy(data, 'cliente')
	}
  async function getDataPrecios() {
	  const { data, error } = await supabase.from('Precios')
    .select()    
		if (error) throw new Error(error.message)
    console.log(data)
		return data
	}
  
   let cantidad, precio, idProducto;
   let submit = false

   async function sendData() {
     const { data, error } = await supabase
    .from('Precios')
    .insert([
      { 'cantidad': cantidad,
        'precio': precio,
        'idProducto': idProducto
     }
    ])          
    }
   
  
</script> 



<header class="text-gray-600 body-font">
    <ul class="flex border-b">
      <li class="-mb-px mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/">Productos</a>
      </li>
      <li class="mr-1">
        <a class="bg-green-300 inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-800 font-semibold" href="/formulario">Cargar Venta</a>
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
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/detallePagos">Detalle Pagos</a>
      </li>
      <li class="mr-1">
        <a class="bg-white inline-block py-2 px-4 text-gray-500 hover:text-blue-500 font-semibold" href="/saldos">Saldos</a>
      </li>
      
    </ul>
  
  </header>


  <section class="text-gray-600 body-font">
    <div class="container px-5 py-12 mx-auto flex flex-wrap items-center">
      <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font py-4 font-medium text-3xl text-gray-900">Listado</h1>
        
        {#await getData()}
              <p>Estamos conectando con el servicio...</p>
        {:then data}
        {#each data as item}
          <ul class="list-inside bg-rose-500">
                   <li>{item.id} - {item.cliente} - {item.codigo1} </li>          
          </ul>
        {/each}
          
        {:catch error}
             <p>Algo está mal:</p>
             <pre>{error}</pre>
        {/await}       
      </div>

      

        <div class="lg:w-2/6 md:w-1/2 bg-gray-400 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 class="text-gray-800 text-lg font-medium title-font mb-5">Ventas</h2>
        <form on:submit|preventDefault={() => submit = true}> 
        <div class="relative mb-4">
          <label for="cantidad" class="leading-7 text-sm text-gray-600">Cantidad</label>
          <input bind:value={cantidad} type=number id="cantidad" name="cantidad" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
          <label for="precio" class="leading-7 text-sm text-gray-600">Precio</label>
          <input  bind:value={precio} id="precio" name="precio" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        </div>
        <div class="relative mb-4">
          <label for="full-name" class="leading-7 text-sm text-gray-800">Id Producto</label>
          <input bind:value={idProducto} type=number id="idCliente" name="IdCliente" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
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
  </section>

  
  
  