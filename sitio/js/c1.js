/* C1 — comportamiento del demo. Completar estos datos antes de publicar. */
const C1 = {
  whatsapp: '',            // ej. '573001234567' — pendiente con Julián
  pagos: {                 // links de Mercado Pago Suscripciones, uno por plan
    autonomia: '', consciente: '', uno: '', rendimiento: '', valoracion: ''
  }
};
const PLANES = {
  valoracion:  { nombre:'Valoración de movimiento', precio:180000, nota:'Pago único. Se abona a tu primer mes.', recurrente:false },
  autonomia:   { nombre:'Autonomía',       precio:420000,  nota:'Remoto. Se renueva cada mes.', recurrente:true },
  consciente:  { nombre:'Consciente',      precio:1280000, nota:'8 sesiones al mes. Se renueva cada mes.', recurrente:true },
  uno:         { nombre:'Uno',             precio:1780000, nota:'12 sesiones al mes. Se renueva cada mes.', recurrente:true },
  rendimiento: { nombre:'Alto rendimiento',precio:2400000, nota:'Desde. Se define tras la valoración.', recurrente:true }
};
const cop = n => '$' + n.toLocaleString('es-CO');

function toast(msg){
  let t = document.querySelector('.toast');
  if(!t){ t = document.createElement('div'); t.className='toast'; t.setAttribute('role','status'); document.body.append(t); }
  t.textContent = msg; t.classList.add('on');
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove('on'), 4200);
}
function abrirWhatsApp(msg){
  if(C1.whatsapp) window.open(`https://wa.me/${C1.whatsapp}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
  else toast('Demo: aquí se abre el WhatsApp de Julián con el mensaje listo.');
}

document.querySelector('.menu-btn')?.addEventListener('click', e=>{
  const n = document.querySelector('.nav nav');
  const abierto = n.classList.toggle('abierto');
  e.currentTarget.setAttribute('aria-expanded', abierto);
});
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav nav').classList.remove('abierto')));
document.querySelectorAll('[data-wa]').forEach(b=>b.addEventListener('click',e=>{ e.preventDefault(); abrirWhatsApp(b.dataset.wa); }));

/* Checkout de membresía */
const form = document.querySelector('#inscripcion');
if(form){
  const sel = form.querySelector('#plan');
  const pintar = () => {
    const p = PLANES[sel.value];
    document.querySelector('#r-plan').textContent = p.nombre;
    document.querySelector('#r-tipo').textContent = p.recurrente ? 'Mensual, sin permanencia' : 'Pago único';
    document.querySelector('#r-total').textContent = cop(p.precio) + (p.recurrente ? ' / mes' : '');
    document.querySelector('#r-nota').textContent = p.nota;
    form.querySelector('#pagar').textContent = p.recurrente ? 'Continuar al pago mensual' : 'Continuar al pago';
    form.querySelector('.solo-recurrente').hidden = !p.recurrente;
    form.querySelector('#acepto-recurrente').required = p.recurrente;
  };
  const q = new URLSearchParams(location.search).get('plan');
  if(q && PLANES[q]) sel.value = q;
  sel.addEventListener('change', pintar); pintar();
  document.querySelectorAll('[data-plan]').forEach(a=>a.addEventListener('click',e=>{
    e.preventDefault(); sel.value = a.dataset.plan; pintar();
    document.querySelector('#inscribirme').scrollIntoView();
  }));
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const link = C1.pagos[sel.value];
    if(link) location.href = link;
    else toast(`Demo: aquí abre el pago seguro de Mercado Pago para ${PLANES[sel.value].nombre}. No se cobró nada.`);
  });
}
