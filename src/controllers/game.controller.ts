import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  operation,
  param,
  getModelSchemaRef,
  requestBody,
} from '@loopback/rest';
import {Game} from '../models';
import {GameRepository} from '../repositories';

export class GameController {
  constructor(
    @repository(GameRepository)
    public gameRepository: GameRepository,
  ) {}

  @operation('post', '/games', {
    summary: 'Create a new game',
    description: 'Adds a new game to the collection.',
    responses: {
      '200': {
        description: 'Game model instance',
        content: {'application/json': {schema: getModelSchemaRef(Game)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {
            title: 'NewGame',
            exclude: ['id'],
          }),
        },
      },
    })
      game: Omit<Game, 'id'>,
  ): Promise<Game> {
    return this.gameRepository.create(game);
  }

  @operation('get', '/games/count', {
    summary: 'Get game count',
    description: 'Returns the number of games matching a where filter.',
    responses: {
      '200': {
        description: 'Game model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.string('where', {
      description: 'Optional filter as JSON string. Example: {"platform":"Super Nintendo (SNES)"}',
      example: '{"platform":"Super Nintendo (SNES)","year":1991}',
    })
      where?: string,
  ): Promise<Count> {
    let parsedWhere: Where<Game> = {};
    if (where) {
      try {
        parsedWhere = JSON.parse(where);
      } catch {
        throw new Error('Invalid JSON string in "where" parameter.');
      }
    }
    return this.gameRepository.count(parsedWhere);
  }

  @operation('get', '/games', {
    summary: 'List games',
    description: 'Retrieves an array of game entries, optionally filtered.',
    responses: {
      '200': {
        description: 'Array of Game model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Game, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.string('filter', {
      description: 'Filter as a JSON string. Example: {"where":{"platform":"Super Nintendo (SNES)"}}',
      example: '{"where":{"platform":"Super Nintendo (SNES)"}, "limit":10, "skip":0, "order":["year DESC"]}',
    })
      filter?: string,
  ): Promise<Game[]> {
    let parsedFilter: Filter<Game> = {};
    if (filter) {
      try {
        parsedFilter = JSON.parse(filter);
      } catch {
        throw new Error('Invalid JSON string in "filter" parameter.');
      }
    }
    return this.gameRepository.find(parsedFilter);
  }

  @operation('patch', '/games', {
    summary: 'Update multiple games',
    description: 'Updates multiple games matching the specified where filter.',
    responses: {
      '200': {
        description: 'Game PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      description: 'Partial Game object with fields to update.',
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {partial: true}),
          examples: {
            updatePlatformAndGenreAndYear: {
              summary: 'Update platform, genre, and year',
              value: {
                platform: 'Super Nintendo (SNES)',
                genre: 'Platformer',
                year: 1990,
              },
            },
            updateRatingOnly: {
              summary: 'Update rating',
              value: {
                rating: 9,
              },
            },
          },
        },
      },
    })
      game: Game,

    @param.query.string('where', {
      description: 'Optional filter as JSON string. Example: {"platform":"Super Nintendo (SNES)"}',
      example: '{"platform":"Super Nintendo (SNES)"}',
    })
      where?: string,
  ): Promise<Count> {
    let parsedWhere: Where<Game> = {};
    if (where) {
      try {
        parsedWhere = JSON.parse(where);
      } catch {
        throw new Error('Invalid JSON string in "where" parameter.');
      }
    }

    return this.gameRepository.updateAll(game, parsedWhere);
  }

  @operation('get', '/games/{id}', {
    summary: 'Get game by ID',
    description: 'Retrieves a single game entry by ID.',
    responses: {
      '200': {
        description: 'Game model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Game, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Game, {exclude: 'where'}) filter?: FilterExcludingWhere<Game>,
  ): Promise<Game> {
    return this.gameRepository.findById(id, filter);
  }

  @operation('patch', '/games/{id}', {
    summary: 'Update game by ID',
    description: 'Partially updates a game entry by its ID.',
    responses: {
      '204': {
        description: 'Game PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {partial: true}),
        },
      },
    })
      game: Game,
  ): Promise<void> {
    await this.gameRepository.updateById(id, game);
  }

  @operation('put', '/games/{id}', {
    summary: 'Replace game by ID',
    description: 'Replaces a complete game entry by its ID.',
    responses: {
      '204': {
        description: 'Game PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() game: Game,
  ): Promise<void> {
    await this.gameRepository.replaceById(id, game);
  }

  @operation('delete', '/games/{id}', {
    summary: 'Delete game by ID',
    description: 'Deletes a game entry by its ID.',
    responses: {
      '204': {
        description: 'Game DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gameRepository.deleteById(id);
  }
}

