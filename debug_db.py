#!/usr/bin/env python3
"""
Debug script to check database schema
"""
import asyncio
import asyncpg
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

async def check_schema():
    neon_url = os.environ.get('NEON_DATABASE_URL', '')
    if not neon_url:
        print("NEON_DATABASE_URL not found")
        return
    
    conn = await asyncpg.connect(neon_url)
    
    try:
        # Check if blogs table exists and its columns
        result = await conn.fetch("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'blogs'
            ORDER BY ordinal_position;
        """)
        
        print("Blogs table columns:")
        for row in result:
            print(f"  {row['column_name']}: {row['data_type']}")
        
        # Check if case_studies table exists and its columns
        result = await conn.fetch("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'case_studies'
            ORDER BY ordinal_position;
        """)
        
        print("\nCase studies table columns:")
        for row in result:
            print(f"  {row['column_name']}: {row['data_type']}")
            
    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(check_schema())