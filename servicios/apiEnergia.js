// Servicio para manejar las llamadas a la API de energía
// Actualmente usa datos mock, reemplazar con endpoints reales cuando estén disponibles

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api"

// Función para calcular ahorro energético
export async function calcularAhorroEnergetico(datosFormulario) {
  try {
    // TODO: Reemplazar con llamada real a Spring Boot API
    // const response = await fetch(`${API_BASE_URL}/calcular-ahorro`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(datosFormulario)
    // })
    //
    // if (!response.ok) {
    //   throw new Error('Error en la respuesta del servidor')
    // }
    //
    // return await response.json()

    // Datos mock mientras el backend no esté disponible
    return await calcularAhorroMock(datosFormulario)
  } catch (error) {
    console.error("Error al calcular ahorro energético:", error)
    throw error
  }
}

// Función mock para simular cálculos del backend
async function calcularAhorroMock(datos) {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const { consumoMensualKw, costoMensualPesos, ubicacion, tipoEdificacion } = datos

  // Factores de cálculo basados en datos reales aproximados
  const factoresUbicacion = {
    norte: 1.2, // Mayor radiación solar
    centro: 1.0, // Radiación promedio
    sur: 0.9, // Menor radiación solar
  }

  const factoresEdificacion = {
    industrial: 0.8, // Mejor eficiencia por escala
    comercial: 0.9, // Eficiencia moderada
    residencial: 1.0, // Eficiencia base
  }

  const factorUbicacion = factoresUbicacion[ubicacion] || 1.0
  const factorEdificacion = factoresEdificacion[tipoEdificacion] || 1.0

  const energiaRentable = Math.round(consumoMensualKw * 0.85 * factorUbicacion) // 85% del consumo cubierto
  const costoInstalacion = Math.round(consumoMensualKw * 45000 * factorEdificacion) // $45,000 pesos por kW instalado
  const costoMantenimiento = Math.round(costoInstalacion * 0.015) // 1.5% anual
  const ahorroMensual = Math.round(costoMensualPesos * 0.75) // 75% de ahorro

  const vidaUtilAnios = 25 // Vida útil típica de paneles solares
  const degradacionAnual = 0.005 // 0.5% degradación anual
  const inflacionEnergetica = 0.04 // 4% inflación anual en energía

  // Calcular punto de equilibrio considerando degradación e inflación
  let ahorroAcumulado = 0
  let puntoEquilibrio = 0

  for (let anio = 1; anio <= vidaUtilAnios; anio++) {
    const factorDegradacion = Math.pow(1 - degradacionAnual, anio - 1)
    const factorInflacion = Math.pow(1 + inflacionEnergetica, anio - 1)
    const ahorroAnual = ahorroMensual * 12 * factorDegradacion * factorInflacion
    ahorroAcumulado += ahorroAnual

    if (ahorroAcumulado >= costoInstalacion && puntoEquilibrio === 0) {
      puntoEquilibrio = anio
    }
  }

  const retornoInversion = puntoEquilibrio > 0 ? puntoEquilibrio : Math.ceil(costoInstalacion / (ahorroMensual * 12))
  const aniosGanancia = retornoInversion < vidaUtilAnios ? vidaUtilAnios - retornoInversion : 0
  const gananciaTotalVidaUtil = Math.max(0, ahorroAcumulado - costoInstalacion)

  const reduccionCo2 = Math.round(consumoMensualKw * 0.4 * 12) // kg CO2 por año
  const beneficiosTributarios = Math.round(costoInstalacion * 0.15) // 15% deducible

  const datosGraficas = {
    comparacionCostos: [
      { nombre: "Energía Actual", costo: costoMensualPesos },
      { nombre: "Energía Renovable", costo: Math.round(costoMensualPesos * 0.25) },
    ],
    ahorroTiempo: Array.from({ length: vidaUtilAnios }, (_, i) => {
      const anio = i + 1
      const factorDegradacion = Math.pow(1 - degradacionAnual, anio - 1)
      const factorInflacion = Math.pow(1 + inflacionEnergetica, anio - 1)
      const ahorroAnual = ahorroMensual * 12 * factorDegradacion * factorInflacion

      // Calcular ahorro acumulado hasta este año
      let ahorroAcumuladoHastaAnio = 0
      for (let j = 1; j <= anio; j++) {
        const factorDegJ = Math.pow(1 - degradacionAnual, j - 1)
        const factorInflJ = Math.pow(1 + inflacionEnergetica, j - 1)
        ahorroAcumuladoHastaAnio += ahorroMensual * 12 * factorDegJ * factorInflJ
      }

      return {
        anio: anio,
        ahorro: Math.round(ahorroAcumuladoHastaAnio),
        ahorroAnual: Math.round(ahorroAnual),
        estado: anio <= retornoInversion ? "recuperacion" : "ganancia",
      }
    }),
  }

  return {
    energiaRentable,
    costoInstalacion,
    costoMantenimiento,
    retornoInversion,
    aniosGanancia,
    gananciaTotalVidaUtil: Math.round(gananciaTotalVidaUtil),
    reduccionCo2,
    beneficiosTributarios,
    ahorroMensual,
    vidaUtilAnios,
    datosGraficas,
  }
}

// Función para obtener factores de cálculo por región
export async function obtenerFactoresRegion(ubicacion) {
  try {
    // TODO: Implementar llamada real a API
    // const response = await fetch(`${API_BASE_URL}/factores-region/${ubicacion}`)
    // return await response.json()

    // Mock data
    const factoresMock = {
      norte: { radiacionSolar: 1.2, costoInstalacion: 0.9 },
      centro: { radiacionSolar: 1.0, costoInstalacion: 1.0 },
      sur: { radiacionSolar: 0.9, costoInstalacion: 1.1 },
    }

    return factoresMock[ubicacion] || factoresMock["centro"]
  } catch (error) {
    console.error("Error al obtener factores de región:", error)
    throw error
  }
}
