import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Game extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    jsonSchema: {
      enum: [
        'NES',
        'Super Nintendo (SNES)',
        'Nintendo 64',
        'GameCube',
        'Wii',
        'Wii U',
        'Nintendo Switch',
        'Game Boy',
        'Game Boy Color',
        'Game Boy Advance',
        'Nintendo DS',
        'Nintendo 3DS',
        'PlayStation',
        'PlayStation 2',
        'PlayStation 3',
        'PlayStation 4',
        'PlayStation 5',
        'PlayStation Portable (PSP)',
        'PlayStation Vita',
        'Sega Genesis',
        'Sega Saturn',
        'Sega Dreamcast',
        'Sega Master System',
        'Atari 2600',
        'Atari 5200',
        'Atari 7800',
        'Atari Jaguar',
        'Neo Geo',
        'TurboGrafx-16',
        'PC Engine',
        'Commodore 64',
        'MS-DOS',
        'Arcade',
        'Other',
      ],
    },
  })
  platform: string;

  @property({
    type: 'string',
    default: 'Misc',
  })
  genre?: string;

  @property({
    type: 'number',
    default: 0,
  })
  year?: number;

  @property({
    type: 'number',
    default: 0,
  })
  rating?: number;

  @property({
    type: 'string',
    jsonSchema: {
      example:
        'https://upload.wikimedia.org/wikipedia/en/3/3b/Super_Mario_World_Coverart.png',
    },
  })
  picture?: string;

  constructor(data?: Partial<Game>) {
    super(data);
  }
}

export interface GameRelations {
  // describe navigational properties here
}

export type GameWithRelations = Game & GameRelations;

