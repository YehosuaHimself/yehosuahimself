import { useEffect, useRef } from 'react';

/**
 * use3DTilt - A 3D perspective tilt hook for Apple-style card interactions
 *
 * Features:
 * - Calculates tilt angles based on cursor position
 * - Max tilt: 8 degrees (subtle, premium feel)
 * - Applies perspective transform with scale
 * - Spring-like easing on enter/leave
 * - GPU acceleration with will-change
 * - Disabled on touch devices (no tilt on mobile)
 * - Proper cleanup of all event listeners
 *
 * Usage:
 * const cardRef = useRef(null);
 * use3DTilt(cardRef);
 *
 * <div ref={cardRef} className="card">
 *   <h2>Tilt Me</h2>
 * </div>
 */

export default function use3DTilt(elementRef) {
  const animationFrameRef = useRef(null);
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const isTouchDeviceRef = useRef(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Detect touch device
    isTouchDeviceRef.current =
      () =>
        matchMedia('(hover: none) and (pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;

    // Don't attach tilt on touch devices
    if (isTouchDeviceRef.current()) {
      return;
    }

    // Apply GPU acceleration
    element.style.willChange = 'transform';

    const maxTilt = 8; // degrees
    const animationDuration = 300; // ms for spring-like easing
    let animationStartTime = null;

    // Handle mousemove for tilt calculation
    const handleMouseMove = (e) => {
      if (!isHoveringRef.current) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate cursor position relative to center (-1 to 1)
      const relX = (e.clientX - centerX) / (rect.width / 2);
      const relY = (e.clientY - centerY) / (rect.height / 2);

      // Clamp values
      const clampedX = Math.max(-1, Math.min(1, relX));
      const clampedY = Math.max(-1, Math.min(1, relY));

      // Calculate rotation angles (inverted for natural feel)
      targetRotationRef.current.y = clampedX * maxTilt;
      targetRotationRef.current.x = -clampedY * maxTilt;
    };

    // Handle mouseenter
    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      animationStartTime = performance.now();
      scaleRef.current = 1.02; // Scale up slightly

      if (!animationFrameRef.current) {
        animateTransform();
      }
    };

    // Handle mouseleave - reset to flat
    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      targetRotationRef.current = { x: 0, y: 0 };
      scaleRef.current = 1;
      animationStartTime = performance.now();

      if (!animationFrameRef.current) {
        animateTransform();
      }
    };

    // Animation loop with spring-like easing
    const animateTransform = () => {
      const now = performance.now();
      const elapsed = animationStartTime ? now - animationStartTime : 0;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function (cubic easeOut for smooth spring-like motion)
      const eased = 1 - Math.pow(1 - progress, 3);

      // Interpolate current rotation toward target
      currentRotationRef.current.x +=
        (targetRotationRef.current.x - currentRotationRef.current.x) * 0.15;
      currentRotationRef.current.y +=
        (targetRotationRef.current.y - currentRotationRef.current.y) * 0.15;

      // Apply transform
      element.style.transform = `
        perspective(1000px)
        rotateX(${currentRotationRef.current.x}deg)
        rotateY(${currentRotationRef.current.y}deg)
        scale3d(${scaleRef.current}, ${scaleRef.current}, ${scaleRef.current})
      `;

      // Continue animating if hovering or if values haven't settled
      const settled =
        Math.abs(targetRotationRef.current.x - currentRotationRef.current.x) < 0.01 &&
        Math.abs(targetRotationRef.current.y - currentRotationRef.current.y) < 0.01 &&
        Math.abs(scaleRef.current - 1) < 0.001;

      if (!settled || isHoveringRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateTransform);
      } else {
        animationFrameRef.current = null;
      }
    };

    // Add event listeners
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animateTransform);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      element.style.willChange = 'auto';
      element.style.transform = '';
    };
  }, [elementRef]);
}
