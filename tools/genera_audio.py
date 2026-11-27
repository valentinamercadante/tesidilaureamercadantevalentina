#!/usr/bin/env python3
"""Rigenera gli audio in audio/ con la voce italiana Piper «Paola» (licenza dati CC0).

Serve solo se si modificano i testi in data.js. Prerequisiti:
  pip install piper-tts            (consigliato in un ambiente virtuale)
  ffmpeg                           (per creare gli mp3)
  modello voce: it_IT-paola-medium.onnx + .onnx.json da
  https://huggingface.co/rhasspy/piper-voices/tree/main/it/it_IT/paola/medium
Uso:  python3 tools/genera_audio.py /percorso/it_IT-paola-medium.onnx
"""
import json, os, subprocess, sys, tempfile

radice = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
modello = sys.argv[1] if len(sys.argv) > 1 else "it_IT-paola-medium.onnx"
testi = json.loads(subprocess.check_output(["node", os.path.join(radice, "tools", "estrai-testi.js")]))
os.makedirs(os.path.join(radice, "audio"), exist_ok=True)
with tempfile.TemporaryDirectory() as tmp:
    for chiave, testo in testi.items():
        wav = os.path.join(tmp, chiave + ".wav")
        subprocess.run(["piper", "-m", modello, "-f", wav, "--length-scale", "1.05",
                        "--sentence-silence", "0.35"], input=testo.encode(), check=True)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav, "-ac", "1", "-ar", "22050",
                        "-b:a", "56k", os.path.join(radice, "audio", chiave + ".mp3")], check=True)
        print("ok", chiave)
