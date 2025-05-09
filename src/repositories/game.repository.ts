import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Game, GameRelations} from '../models';

export class GameRepository extends DefaultCrudRepository<
  Game,
  typeof Game.prototype.id,
  GameRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Game, dataSource);
  }
}
