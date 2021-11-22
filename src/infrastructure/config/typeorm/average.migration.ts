import { MigrationInterface, QueryRunner } from 'typeorm';

export class AverageTrigger implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    console.log('migate!');
    await queryRunner.query(
      'DROP TRIGGER IF EXISTS computeAvg on "public"."review"',
    );
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION computeAverage()
        RETURNS trigger AS
        $$
        BEGIN
        UPDATE movie
        SET score = (SELECT AVG(score) FROM review
                            WHERE review.movieId = movie.id)
        WHERE id = NEW.movieId;
        END;
        $$
        LANGUAGE 'plpgsql'
    `,
    );
    await queryRunner.query(
      `CREATE TRIGGER computeAvg
      AFTER INSERT OR UPDATE OR DELETE ON review
      FOR EACH ROW
          EXECUTE PROCEDURE computeAverage()`,
    );
  }

  async down(): Promise<void> {
    return;
  }
}
