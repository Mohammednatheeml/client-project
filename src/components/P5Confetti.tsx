import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";

const themeCouleur = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];

const P5Confetti: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let myp5: p5 | undefined;
    let timeout: NodeJS.Timeout;
    let nouvelle: p5.Vector, ancienne: p5.Vector, pression: boolean;
    let confettis: any;

    class Particule {
      parent: any;
      gravite: p5.Vector;
      position: p5.Vector;
      velocite: p5.Vector;
      friction: number;
      taille: number;
      moitie: number;
      couleur: p5.Color;
      forme: number;
      etape: number;
      prise: number;
      priseFacteur: number;
      multFacteur: number;
      priseAngle: number;
      priseVitesse: number;

      constructor(parent: any) {
        this.parent = parent;
        this.gravite = parent.gravite;
        this.reinit();
        this.forme = Math.round(Math.random());
        this.etape = 0;
        this.prise = 0;
        this.priseFacteur = Math.random() * 0.04 - 0.02;
        this.multFacteur = Math.random() * 0.07 + 0.01;
        this.priseAngle = 0;
        this.priseVitesse = 0.05;
      }
      reinit() {
        this.position = this.parent.position.copy();
        this.position.y = Math.random() * -80 - 20;
        this.position.x = Math.random() * window.innerWidth;
        this.velocite = new p5.Vector(
          Math.random() * 12 - 6,
          Math.random() * 12 - 10
        );
        this.friction = Math.random() * 0.015 + 0.98;
        this.taille = Math.round(Math.random() * 10 + 5);
        this.moitie = this.taille / 2;
        this.couleur = sketchRef.current!.color(
          themeCouleur[Math.floor(Math.random() * themeCouleur.length)]
        );
      }
      dessiner() {
        this.etape = 0.5 + Math.sin(this.velocite.y * 20) * 0.5;
        this.prise =
          this.priseFacteur + Math.cos(this.priseAngle) * this.multFacteur;
        this.priseAngle += this.priseVitesse;
        sketchRef.current!.push();
        sketchRef.current!.translate(this.position.x, this.position.y);
        sketchRef.current!.rotate(this.velocite.x * 2);
        sketchRef.current!.scale(1, this.etape);
        sketchRef.current!.noStroke();
        sketchRef.current!.fill(this.couleur);
        if (this.forme === 0) {
          sketchRef.current!.rect(
            -this.moitie,
            -this.moitie,
            this.taille,
            this.taille
          );
        } else {
          sketchRef.current!.ellipse(0, 0, this.taille, this.taille);
        }
        sketchRef.current!.pop();
      }
      integration() {
        this.velocite.add(this.gravite);
        this.velocite.x += this.prise;
        this.velocite.mult(this.friction);
        this.position.add(this.velocite);
        if (this.position.y > window.innerHeight) this.reinit();
        if (this.position.x < 0) this.reinit();
        if (this.position.x > window.innerWidth + 10) this.reinit();
      }
      rendu() {
        this.integration();
        this.dessiner();
      }
    }

    class SystemeDeParticules {
      position: p5.Vector;
      nombreMax: number;
      gravite: p5.Vector;
      particules: Particule[];
      constructor(nombreMax: number, position: p5.Vector, gravite: p5.Vector) {
        this.position = position.copy();
        this.nombreMax = nombreMax;
        this.gravite = gravite.copy();
        this.particules = [];
        for (let i = 0; i < this.nombreMax; i++) {
          this.particules.push(new Particule(this));
        }
      }
      rendu() {
        this.particules.forEach((p) => p.rendu());
      }
    }

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.frameRate(60);
        ancienne = p.createVector(0, 0);
        nouvelle = p.createVector(0, 0);
        confettis = new SystemeDeParticules(
          300,
          p.createVector(p.width / 2, -20),
          p.createVector(0, 0.1)
        );
      };
      p.draw = () => {
        p.clear();
        p.background("#111");
        nouvelle.x = p.mouseX;
        nouvelle.y = p.mouseY;
        confettis.rendu();
        ancienne.x = nouvelle.x;
        ancienne.y = nouvelle.y;
      };
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        confettis.position = p.createVector(p.width / 2, -40);
      };
    };

    if (sketchRef.current) {
      myp5 = new p5(sketch, sketchRef.current);
      // Fade out confetti after 2 seconds, then call onFinish
      timeout = setTimeout(() => {
        setVisible(false);
        if (onFinish) onFinish();
      }, 2000);
    }
    return () => {
      if (myp5) myp5.remove();
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div
      ref={sketchRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s cubic-bezier(0.4,0,0.2,1)",
      }}
    />
  );
};

export default P5Confetti;

const EnvelopeComponent = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNextPage, setShowNextPage] = useState(false);

  const handleEnvelopeOpen = () => {
    setShowConfetti(true);
  };

  return (
    <>
      {showConfetti && <P5Confetti onFinish={() => setShowNextPage(true)} />}
      {/* Envelope and other content */}
      {showNextPage && (
        <NextPageComponent /> // Your next page or animation
      )}
    </>
  );
};

<EnvelopeComponent />;
