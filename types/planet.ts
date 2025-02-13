export interface PlanetPhysicalProperties {
    diameterKm: number;           // Diameter in kilometers
    avgTemperatureC: number;      // Average temperature in Celsius
    surfaceGravityMs2: number;    // Surface gravity in m/s²
    orbitalPeriodDays: number;    // Orbital period in Earth days
}

interface IEarth {
    day: string;
    night: string;
}

export interface IPlanet {
    name: string;                             // Name of the planet
    description: string;                      // Detailed, inspiring description
    physicalProperties: PlanetPhysicalProperties;
    imageUrl: string;                         // URL or path to the planet's image
    distanceFromSunMillionKm: number;         // Distance from the Sun in million kilometers
    rotationSpeed: number;
    texture: string | IEarth;
    hasRings?: boolean;
    ringTexture?: string;
}