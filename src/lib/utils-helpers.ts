'use client';

import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'toolinter_history';
const MAX_ITEMS = 10;

export interface HistoryEntry {
  id: string;
  tool: string;       // e.g. "gaji-bersih", "kpr"
  label: string;      // e.g. "Gaji Rp 10jt → THP Rp 9.275.000"
  data: Record<string, unknown>;
  timestamp: number;
}

function getAllHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveAllHistory(entries: HistoryEntry[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

export function saveHistory(tool: string, label: string, data: Record<string, unknown>) {
  const entries = getAllHistory();
  const entry: HistoryEntry = {
    id: `${tool}-${Date.now()}`,
    tool,
    label,
    data,
    timestamp: Date.now(),
  };
  // Prepend, dedupe by tool (keep latest), cap at MAX_ITEMS
  const filtered = entries.filter(e => e.id !== entry.id);
  const updated = [entry, ...filtered].slice(0, MAX_ITEMS);
  saveAllHistory(updated);
}

export function getHistory(tool?: string): HistoryEntry[] {
  const all = getAllHistory();
  return tool ? all.filter(e => e.tool === tool) : all;
}

export function clearHistory(tool?: string) {
  if (!tool) {
    localStorage.removeItem(HISTORY_KEY);
  } else {
    const filtered = getAllHistory().filter(e => e.tool !== tool);
    saveAllHistory(filtered);
  }
}

// --- Share to WhatsApp ---
export function shareToWhatsApp(text: string, url?: string) {
  const fullUrl = url || window.location.href;
  const msg = `${text}\n\n🔗 ${fullUrl}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
}

export function formatShareText(toolName: string, items: [string, string][]): string {
  let text = `📊 *${toolName} — Toolinter*\n\n`;
  for (const [label, value] of items) {
    text += `• ${label}: *${value}*\n`;
  }
  text += `\n✨ Hitung gratis di toolinter.net`;
  return text;
}

// --- Download PDF ---
export async function downloadResultPdf(elementId: string, filename: string) {
  const { default: jsPDF } = await import('jspdf');
  const { default: html2canvas } = await import('html2canvas');

  const el = document.getElementById(elementId);
  if (!el) return;

  const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
  pdf.save(filename);
}

// --- UMR Data 2025 ---
export const UMR_DATA: Record<string, number> = {
  'Jakarta': 5396761,
  'Surabaya': 4725380,
  'Bandung': 4444444,
  'Bekasi': 5396761,
  'Tangerang': 4780285,
  'Depok': 4939126,
  'Semarang': 3214960,
  'Medan': 3536398,
  'Makassar': 3537699,
  'Palembang': 3516781,
  'Yogyakarta': 2260806,
  'Denpasar': 2997501,
  'Malang': 3348450,
  'Solo': 2260806,
  'Bogor': 4869205,
  'Cirebon': 2469805,
  'Balikpapan': 3433765,
  'Pontianak': 2768485,
  'Manado': 3656565,
  'Batam': 4874405,
  'Padang': 2833839,
  'Pekanbaru': 3202866,
  'Samarinda': 3437500,
  'Banjarmasin': 3337498,
  'Jogja': 2260806,
  'Bali': 2997501,
  'Aceh': 3659274,
  'Lampung': 2735536,
  'Mataram': 2475000,
  'Kupang': 2186500,
  'Jayapura': 3642529,
  'Ambon': 2886000,
  'Sorong': 3325000,
};
