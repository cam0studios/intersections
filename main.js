import Vector from "@cam0studios/vector-library";
/**
 * Checks if a point is on a line
 * @param {Vector} line1 - The first point of the line
 * @param {Vector} line2 - The second point of the line
 * @param {Vector} point - The point to check
 * @returns {boolean} - Whether the point is on the line
 */
export function linePointCollision(line1, line2, point) {
	let d1 = (line1)["-"](point);
	let d2 = (line2)["-"](point);
	let l = (line2)["-"](line1);
	return d1 + d2 > l - 0.1 && d1 + d2 < l + 0.1;
}
/**
 * Gets the closest point on a line to a point
 * @param {Vector} line1 - The first point of the line
 * @param {Vector} line2 - The second point of the line
 * @param {Vector} point - The point to check
 * @returns {Vector} - The closest point on the line
 */
export function lineClosestPoint(line1, line2, point) {
	let dif = (line2)["-"](line1);
	let dot = (point)["-"](line1).dot(dif) / dif.magSq;
	return (line1)["+"]((dif)["*"](dot));
}
/**
 * Checks if a line intersects a circle
 * @param {Vector} line1 - The first point of the line
 * @param {Vector} line2 - The second point of the line
 * @param {Vector} center - The center of the circle
 * @param {number} radius - The radius of the circle
 * @returns {boolean} - Whether the line intersects the circle
 */
export function lineCircleCollision(line1, line2, center, radius) {
	if ((line1)["-"](center) < radius || (line2)["-"](center) < radius) return true;
	let closest = lineClosestPoint(line1, line2, center);
	if (!linePointCollision(line1, line2, closest)) return false;
	return (closest)["-"](center) < radius;
}

/**
 * Returns intersections between a ray and a circle
 * @param {Vector} origin - The origin of the ray
 * @param {Vector} direction - The direction of the ray
 * @param {Vector} center - The center of the circle
 * @param {number} radius - The radius of the circle
 * @returns {number[]} - The solutions to the ray-circle collision
 */
export function raycast(origin, direction, center, radius) {
	direction = direction.normalize();
	let oc = (origin)["-"](center);
	let a = direction.dot(direction);
	let b = 2 * oc.dot(direction);
	let c = oc.magSq() - radius * radius;
	let disc = b * b - 4 * a * c;
	let solutions = [];
	if (disc == 0) solutions.push(-b / (2 * a));
	else if (disc > 0) solutions.push((-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a));
	return solutions.filter(s => s >= 0);
}