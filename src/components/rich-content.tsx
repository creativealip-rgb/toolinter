"use client";

import React from "react";
import { HelpCircle, Lightbulb, AlertTriangle, ChevronRight } from "lucide-react";

interface RichContentProps {
  paragraphs: string[];
}

/**
 * Smart paragraph renderer that detects content patterns
 * and renders them with appropriate styling:
 * - Numbered lists → styled step cards
 * - Bullet lists → styled bullet cards  
 * - Q:/A: pairs → FAQ accordion style
 * - Regular paragraphs → clean text
 * - Tips/important → callout boxes
 */
export default function RichContent({ paragraphs }: RichContentProps) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < paragraphs.length) {
    const p = paragraphs[i].trim();

    // Skip empty
    if (!p) { i++; continue; }

    // --- FAQ Q:/A: pairs ---
    if (p.includes("Q:") && p.includes("A:")) {
      const faqItems = parseFaq(p);
      if (faqItems.length > 0) {
        elements.push(
          <div key={`faq-${i}`} className="space-y-3">
            {faqItems.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-blue-200 bg-blue-50/50 overflow-hidden"
              >
                <summary className="flex items-start gap-3 p-4 cursor-pointer select-none hover:bg-blue-50 transition">
                  <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-blue-900">{faq.q}</span>
                </summary>
                <div className="px-4 pb-4 pl-12">
                  <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        );
        i++;
        continue;
      }
    }

    // --- Numbered lists (lines starting with "1." or "1)") ---
    const numberedLines = p.split("\n").filter(l => /^\d+[\.\)]\s/.test(l.trim()));
    if (numberedLines.length >= 2) {
      elements.push(
        <div key={`steps-${i}`} className="space-y-2">
          {numberedLines.map((line, idx) => {
            const text = line.trim().replace(/^\d+[\.\)]\s*/, "");
            return (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:border-blue-200 transition">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed pt-0.5">{text}</p>
              </div>
            );
          })}
        </div>
      );
      i++;
      continue;
    }

    // --- Bullet lists (lines starting with "•" or "- ") ---
    const bulletLines = p.split("\n").filter(l => /^[•\-]\s/.test(l.trim()));
    if (bulletLines.length >= 2) {
      elements.push(
        <ul key={`bullets-${i}`} className="space-y-2">
          {bulletLines.map((line, idx) => {
            const text = line.trim().replace(/^[•\-]\s*/, "");
            return (
              <li key={idx} className="flex items-start gap-2.5">
                <ChevronRight className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700 leading-relaxed">{text}</span>
              </li>
            );
          })}
        </ul>
      );
      i++;
      continue;
    }

    // --- "Bagian N —" or "Langkah N:" pattern → styled step cards ---
    if (/^(Bagian|Langkah|Step|Fase)\s+\d/i.test(p)) {
      const lines = p.split("\n").filter(Boolean);
      elements.push(
        <div key={`parts-${i}`} className="space-y-2">
          {lines.map((line, idx) => {
            const isLabel = /^(Bagian|Langkah|Step|Fase)\s+\d/i.test(line.trim());
            return (
              <div key={idx} className={`p-3 rounded-lg border ${isLabel ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"}`}>
                <p className={`text-sm leading-relaxed ${isLabel ? "font-semibold text-amber-900" : "text-gray-700"}`}>
                  {line.trim()}
                </p>
              </div>
            );
          })}
        </div>
      );
      i++;
      continue;
    }

    // --- Regular paragraph ---
    elements.push(
      <p key={`p-${i}`} className="text-gray-700 leading-relaxed">
        {p}
      </p>
    );
    i++;
  }

  return <div className="space-y-4">{elements}</div>;
}

function parseFaq(text: string): { q: string; a: string }[] {
  const items: { q: string; a: string }[] = [];
  // Split by Q: pattern
  const parts = text.split(/(?=Q:\s*)/).filter(Boolean);
  for (const part of parts) {
    const qMatch = part.match(/Q:\s*(.*?)(?:\n|$)/);
    const aMatch = part.match(/A:\s*([\s\S]*?)(?=Q:|$)/);
    if (qMatch && aMatch) {
      items.push({
        q: qMatch[1].trim(),
        a: aMatch[1].trim(),
      });
    }
  }
  return items;
}
