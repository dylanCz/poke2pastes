function encodeTeam(rawText) {
  return LZString.compressToEncodedURIComponent(rawText);
}

function decodeTeam(hash) {
  return LZString.decompressFromEncodedURIComponent(hash);
}

function showEditMode() {
  document.getElementById("edit-mode").style.display = "block";
  document.getElementById("view-mode").style.display = "none";
  history.replaceState(null, "", location.pathname); // remove hash
}

function showViewMode() {
  document.getElementById("edit-mode").style.display = "none";
  document.getElementById("view-mode").style.display = "block";
}

function formatTeam(text, container) {
  const blocks = text.trim().split(/\n\s*\n/);

  container.innerHTML = blocks
    .map(
      (block, i) => `
        <div class="poke-block" data-index="${i}">
          <div class="sprite"></div>
          <pre class="text">${block}</pre>
        </div>
      `,
    )
    .join("");

  blocks.forEach((block, i) => {
    const spritePath = getPokemonSpritePath(block);
    if (spritePath) {
      const img = document.createElement("img");
      img.src = spritePath;
      img.width = 80;

      const spriteDiv = container.querySelector(`[data-index="${i}"] .sprite`);
      spriteDiv.appendChild(img);
    }
  });
}

window.addEventListener("load", () => {
  if (location.hash.length > 1) {
    const decoded = decodeTeam(location.hash.slice(1));
    const finalTeam = decodeMovesInTeam(decoded);

    if (finalTeam) {
      showViewMode();
      formatTeam(finalTeam, document.getElementById("team-display"));
      return;
    }
  }

  showEditMode();
});

document.getElementById("share").addEventListener("click", () => {
  const text = document.getElementById("pastebox").value.trim();
  const encoded = encodeTeam(encodeMovesInTeam(text));

  showViewMode();
  formatTeam(text, document.getElementById("team-display"));
  location.hash = encoded; // change URL
});

let moveToID = {};
let idToMove = moves;

// Build reverse lookup
for (const id in moves) {
  const name = moves[id];
  moveToID[name.toLowerCase()] = Number(id);
}

function encodeMovesInTeam(teamText) {
  let lines = teamText.split("\n");

  return lines
    .map((line) => {
      line = line.trim();

      if (line.startsWith("- ")) {
        const moveName = line.slice(2).toLowerCase();

        if (moveToID[moveName]) {
          return "- " + moveToID[moveName];
        }
      }

      return line;
    })
    .join("\n");
}

function decodeMovesInTeam(teamText) {
  let lines = teamText.split("\n");

  return lines
    .map((line) => {
      line = line.trim();

      if (line.startsWith("- ")) {
        const rest = line.slice(2).trim();
        if (/^\d+$/.test(rest) && idToMove[rest]) {
          return "- " + idToMove[rest];
        }
      }

      return line;
    })
    .join("\n");
}

function getPokemonName(input) {
  const firstLine = input.split("\n")[0];
  return firstLine.split("@")[0].trim().toLowerCase();
}

function getPokemonId(name) {
  for (const id in pokemon) {
    if (pokemon[id] == name) {
      return id;
    }
  }
  return -1;
}

function getPokemonSpritePath(input) {
  const name = getPokemonName(input);
  const id = getPokemonId(name);
  if (id == -1) return null; // unknown Pokémon

  return `data/sprites/pokemon/${id}.png`;
}
