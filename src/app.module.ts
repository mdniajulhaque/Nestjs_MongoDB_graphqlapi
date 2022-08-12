import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.resolver';
import { AppService } from './app.service';
import { TeacherSchema } from './teacher.model';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Teacherdb'),
    MongooseModule.forFeature([{name:'teacher',schema:TeacherSchema}]),
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  //controllers: [AppController],
  providers: [AppController,AppService],
})
export class AppModule {}
