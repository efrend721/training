function MagicArreglo() {
  const arreglo = [
    { id: 0, nombre: "Ervis" },
    { id: 1, nombre: "Gentleman" },
  ];

  return (
    <ul>
      {arreglo?.map((i) => (
        <li key={i.id}>{i.nombre}</li>
      ))}
    </ul>
  );
}
export default MagicArreglo;
