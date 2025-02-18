/**
 * Represents a physical property of a planet.
 */
export interface PlanetPhysicalProperty {
    label: string;       // Property name (e.g., "Diameter (km)")
    value: string | number;  // Property value (numeric or text)
}

/**
 * Represents Earth's day and night textures.
 */
export interface EarthTexture {
    day: string;
    night: string;
}

type Vector3 = [number, number, number];

/**
 * Represents a planet in the solar system.
 */
export interface IPlanet {
    name: string;  // Name of the planet
    classification: "Terrestrial planet" | "Gas giant" | "Ice giant"; // Planet classification
    description: string;  // Detailed description
    radius: number;  // Radius in kilometers,
    position: Vector3; // 3D position in the solar system
    orbitRadius: number;  // Orbit radius in million kilometers,
    orbitSpeed: number;  // Orbit speed relative to Earth,
    rotationSpeed: number;  // Rotation speed relative to Earth
    physicalProperties: PlanetPhysicalProperty[]; // Array of physical properties
    imageUrl: string;  // URL or path to the planet's image
    distanceFromSunMillionKm: number;  // Distance from the Sun in million kilometers
    texture: string | EarthTexture;  // Planet texture (single or day/night for Earth)
    hasRings?: boolean;  // Whether the planet has rings
    ringTexture?: string;  // Texture for the rings if applicable
}
