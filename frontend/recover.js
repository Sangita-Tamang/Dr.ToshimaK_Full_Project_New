import fs from 'fs';
import readline from 'readline';

const logFile = '/Users/yuvraj/.gemini/antigravity/brain/6b33aeca-f363-44d4-998d-ddb892d36a2e/.system_generated/logs/transcript_full.jsonl';

async function recover() {
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let patches = [];

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      if (entry.type === 'PLANNER_RESPONSE' && entry.tool_calls) {
        for (const call of entry.tool_calls) {
          if (call.name === 'multi_replace_file_content' || call.name === 'replace_file_content') {
             const target = call.args.TargetFile;
             if (target && target.includes('src/pages')) {
                patches.push(call);
             }
          }
        }
      }
    } catch (e) { }
  }

  // We want to group by file, and only keep the patches from the LAST few hours BEFORE the git restore.
  // Actually, wait, applying patches programmatically is dangerous because line numbers changed when I did git restore!
  // BUT the git restore brought it back to the EXACT state before those patches were applied!
  // So the line numbers from the FIRST time I applied them WILL perfectly match!
  
  // To avoid duplicates, let's just log the files we have patches for.
  const files = [...new Set(patches.map(p => p.args.TargetFile))];
  console.log("Found patches for:", files);
  
  // Let's output the full JSON of patches to a file so we can inspect or apply them
  fs.writeFileSync('patches.json', JSON.stringify(patches, null, 2));
}

recover();
