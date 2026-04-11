import os
import json
import logging
from typing import Dict, Any, List
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Providers
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/chat")

def call_llama3(messages: List[Dict[str, str]], response_format: str = "text") -> str:
    """Fallback to local Llama 3 via Ollama."""
    import requests
    try:
        logger.info("Attempting fallback to local Llama 3...")
        payload = {
            "model": "llama3",
            "messages": messages,
            "stream": False,
            "format": "json" if response_format == "json_object" else ""
        }
        response = requests.post(OLLAMA_URL, json=payload, timeout=5)
        response.raise_for_status()
        return response.json()["message"]["content"]
    except Exception as e:
        logger.error(f"Llama 3 fallback failed: {str(e)}")
        raise e

def generate_workout_plan(user_profile: Dict[str, Any]) -> Dict[str, Any]:
    prompt = f"""
    You are an expert fitness coach. Generate a personalized 4-week workout plan for a user with the following profile:
    - Age: {user_profile.get('age')}
    - Gender: {user_profile.get('gender')}
    - Weight: {user_profile.get('weight_kg')}kg
    - Height: {user_profile.get('height_cm')}cm
    - Fitness Goal: {user_profile.get('fitness_goal')}
    
    Return the response ONLY as a JSON object with the following structure:
    {{
        "plan_name": "...",
        "weeks": [
            {{
                "week_number": 1,
                "days": [
                    {{
                        "day_name": "Day 1",
                        "focus": "...",
                        "exercises": [
                            {{ "name": "...", "sets": "...", "reps": "...", "notes": "..." }}
                        ]
                    }}
                ]
            }}
        ],
        "general_advice": "..."
    }}
    """
    
    messages = [
        {"role": "system", "content": "You are a specialized fitness system. Always output valid JSON."},
        {"role": "user", "content": prompt}
    ]
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            response_format={"type": "json_object"},
            timeout=10
        )
        return json.loads(response.choices[0].message.content)
    except Exception:
        try:
            # Fallback to Llama 3
            content = call_llama3(messages, response_format="json_object")
            return json.loads(content)
        except Exception:
            # Final Static Fallback: ELITE OPERATIVE PROTOTYPE
            logger.warning("All AI providers failed. Returning Static Elite Plan.")
            return {
                "plan_name": "APEX ALPHA PROTOCOL (FALLBACK ACTIVE)",
                "is_fallback": True,
                "weeks": [
                    {
                        "week_number": 1,
                        "days": [
                            {
                                "day_name": "Monday",
                                "focus": "Hypertrophy / Neural Sync",
                                "exercises": [
                                    { "name": "Compound Lift A", "sets": "4", "reps": "8-10", "notes": "Maximize explosive power." },
                                    { "name": "Accessory B", "sets": "3", "reps": "12", "notes": "Focus on control." }
                                ]
                            }
                        ]
                    }
                ],
                "general_advice": "Maintain hydration. Monitor neural anchors."
            }

def generate_nutrition_plan(user_profile: Dict[str, Any]) -> Dict[str, Any]:
    prompt = f"""
    You are a registered dietitian. Calculate calorie and macro targets for a user with the following profile:
    - Age: {user_profile.get('age')}
    - Gender: {user_profile.get('gender')}
    - Weight: {user_profile.get('weight_kg')}kg
    - Height: {user_profile.get('height_cm')}cm
    - Fitness Goal: {user_profile.get('fitness_goal')}
    
    Return the response ONLY as a JSON object with the following structure:
    {{
        "daily_calories": int,
        "protein_g": int,
        "carbs_g": int,
        "fats_g": int,
        "advice": "..."
    }}
    """
    
    messages = [
        {"role": "system", "content": "You are a specialized nutrition system. Always output valid JSON."},
        {"role": "user", "content": prompt}
    ]
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            response_format={"type": "json_object"},
            timeout=10
        )
        return json.loads(response.choices[0].message.content)
    except Exception:
        try:
            # Fallback to Llama 3
            content = call_llama3(messages, response_format="json_object")
            return json.loads(content)
        except Exception:
            # Final Static Fallback: ELITE NUTRITION
            return {
                "daily_calories": 2800,
                "protein_g": 210,
                "carbs_g": 350,
                "fats_g": 80,
                "is_fallback": True,
                "advice": "Strategic macro-cycling enabled. Focus on nutrient density."
            }

def get_ai_chat_response(query: str, history: list) -> str:
    messages = [
        {"role": "system", "content": "You are Apex, a professional fitness assistant. Help the user with their training and nutrition questions."}
    ]
    for msg in history:
        messages.append(msg)
    messages.append({"role": "user", "content": query})
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            timeout=10
        )
        return response.choices[0].message.content
    except Exception:
        try:
            return call_llama3(messages)
        except Exception:
            return "SIGNAL_LOST: Fallback AI services unavailable. Manual parameters required."
