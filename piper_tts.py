import os
import wave
from functools import lru_cache
from pathlib import Path

from piper import PiperVoice


DEFAULT_VOICE_MODELS = {
    "en": Path("assets/voices/en_US-lessac-medium.onnx"),
    "es": Path("assets/voices/es_ES-sharvard-medium.onnx"),
}


def _normalize_language(language: str) -> str:
    return language.lower().split("-", 1)[0].split("_", 1)[0]


def _model_path(language: str) -> Path:
    if language not in DEFAULT_VOICE_MODELS:
        raise ValueError(f"Piper voice is not configured for language: {language}")

    env_name = f"PIPER_VOICE_{language.upper()}"
    model_path = Path(os.getenv(env_name, DEFAULT_VOICE_MODELS[language]))
    config_path = Path(f"{model_path}.json")
    if not model_path.is_file() or not config_path.is_file():
        voice_name = model_path.stem
        raise FileNotFoundError(
            f"Piper model files were not found for '{language}': {model_path} and "
            f"{config_path}. Download them with: python -m piper.download_voices "
            f"--data-dir assets/voices {voice_name}"
        )

    return model_path


@lru_cache(maxsize=None)
def _load_voice(language: str) -> PiperVoice:
    return PiperVoice.load(str(_model_path(language)))


def synthesize_to_wav(text: str, language: str, output_path: str | Path) -> None:
    """Synthesize text into a WAV file with the configured local Piper voice."""
    voice = _load_voice(_normalize_language(language))
    with wave.open(str(output_path), "wb") as wav_file:
        voice.synthesize_wav(text, wav_file)
