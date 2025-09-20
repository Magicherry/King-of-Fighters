<h2 align="center">
  King of Fighters - Web Edition <br/>
</h2>

<p align="center">
  A browser-based fighting game inspired by the classic King of Fighters series, built with vanilla JavaScript and HTML5 Canvas.
</p>
<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript" alt="JavaScript Version">
  <img src="https://img.shields.io/badge/HTML5-Canvas-orange?logo=html5" alt="HTML5 Canvas">
  <img src="https://img.shields.io/badge/CSS3-Flexbox-blue?logo=css3" alt="CSS3">
  <img src="https://img.shields.io/badge/jQuery-3.3.1-0769AD?logo=jquery" alt="jQuery">
  <img src="https://img.shields.io/badge/Animation-GIF-green?logo=giphy" alt="GIF Animation">
  <img src="https://img.shields.io/badge/Game%20Engine-Custom-red?logo=gamemaker" alt="Custom Game Engine">
  <img src="https://img.shields.io/badge/Physics-2D-purple?logo=unity" alt="2D Physics">
</p>

## Overview

This project recreates the core mechanics of a 2D fighting game, featuring character animations, combat systems, and real-time multiplayer controls. The game implements a complete fighting game framework with physics, collision detection, and animated sprite rendering.

## Features

### Core Game Mechanics
- **Real-time Combat System**: Frame-based combat with precise timing and collision detection
- **Character Physics**: Gravity, momentum, and movement mechanics
- **Health & Energy Systems**: Dynamic health bars with visual feedback and energy meter for special attacks
- **Multiple Attack Types**: Basic punches, kicks, aerial attacks, and special moves
- **State Machine**: Comprehensive character state management (idle, moving, jumping, attacking, defending, defeated)

### Visual & Audio
- **Animated Sprites**: GIF-based character animations with multiple frames
- **Dynamic Backgrounds**: Animated background environments
- **Responsive UI**: Health bars, timer, and energy meters with smooth transitions
- **Character Mirroring**: Automatic sprite flipping based on player positions

### Controls
- **Player 1**: WASD movement, J/K for attacks, Shift for dash, Space for special moves
- **Player 2**: Arrow keys movement, 1/2 for attacks, Period for dash, Enter for special moves

## Architecture

```
King-of-Fighters/
├── static/
│   ├── css/
│   │   ├── base.css          # UI styling and layout
│   │   └── index.css         # Additional styles
│   ├── images/
│   │   ├── background/       # Animated backgrounds
│   │   └── player/kyo/       # Character sprite animations
│   └── js/
│       ├── ac_game_object/   # Base game object framework
│       ├── controller/       # Input handling system
│       ├── game_map/         # Game environment management
│       ├── player/           # Character classes and logic
│       ├── utils/            # GIF processing utilities
│       └── base.js           # Main game initialization
└── templates/
    └── index.html            # Game entry point
```

## Technical Implementation

### Game Engine Architecture

The project follows a modular object-oriented design:

```
AcGameObject (Base Class)
├── GameMap (Environment)
├── Player (Character Base)
│   └── Kyo (Specific Fighter)
└── Controller (Input Handler)
```

### Core Systems

#### 1. Game Loop
- 60 FPS rendering cycle using `requestAnimationFrame`
- Delta time calculations for smooth animations
- Automatic object lifecycle management

#### 2. Physics Engine
- Gravity simulation with ground collision
- Velocity-based movement system
- Boundary detection and containment

#### 3. Animation System
- GIF frame extraction and playback
- State-based animation switching
- Configurable frame rates and offsets

#### 4. Collision Detection
- Rectangle-based collision detection
- Attack hitboxes with precise timing
- Multi-layered collision zones

#### 5. State Management
```javascript
// Character States
0: Idle
1: Walking Forward
2: Walking Backward  
3: Jumping
4: Basic Attack
5: Taking Damage
6: Defeated
7: Dashing
8: Kick Attack
9: Aerial Attack
10: Special Move
```

## Game Mechanics

### Combat System
- **Frame Data**: Each attack has specific startup, active, and recovery frames
- **Hit Confirmation**: Visual and mechanical feedback on successful hits
- **Damage Scaling**: Progressive damage reduction for extended combos
- **Special Moves**: Energy-consuming powerful attacks with extended range

### Character Abilities
- **Basic Attacks**: Quick punches and kicks with short range
- **Aerial Combat**: Jump attacks with different properties
- **Dash Mechanics**: Quick movement with temporary invincibility frames
- **Special Techniques**: High-damage moves requiring full energy meter

## Getting Started

### Prerequisites
- Modern web browser with HTML5 Canvas support
- Local web server (for proper file loading)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/King-of-Fighters.git
cd King-of-Fighters
```

2. Start a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to:
```
http://localhost:8000
```

### Controls Reference

| Action | Player 1 | Player 2 |
|--------|----------|----------|
| Move Left | A | ← |
| Move Right | D | → |
| Jump | W | ↑ |
| Punch | J | 1 |
| Kick | K | 2 |
| Dash | Shift + A/D | . + ←/→ |
| Special Move | Space + A/D | Enter + ←/→ |
| Jump Attack | W + J | ↑ + 1 |

## Development

### File Structure Details

- **`base.js`**: Main game initialization and player management
- **`ac_game_object/base.js`**: Core game object framework with lifecycle management
- **`player/base.js`**: Character physics, combat logic, and state management
- **`player/kyo.js`**: Specific character implementation with animations
- **`game_map/base.js`**: Environment rendering and UI management
- **`controller/base.js`**: Keyboard input handling and event management
- **`utils/gif.js`**: GIF parsing and frame extraction utilities

### Adding New Characters

1. Create character sprite sheets in `/static/images/player/[character]/`
2. Extend the `Player` class in `/static/js/player/`
3. Implement character-specific animations and properties
4. Register the character in the main game loop

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is for personal educational use. Character sprites and assets remain the property of their respective copyright holders

## Acknowledgments

- Inspired by the classic King of Fighters series by SNK
- GIF processing utilities adapted from community libraries
- Canvas animation techniques from modern web game development practices