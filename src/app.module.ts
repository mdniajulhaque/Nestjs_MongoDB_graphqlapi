import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import  { join } from 'path';
import { StudentModule } from './Student/student.modules';
import { TeacherModule } from './Teacher/teacher.module';
import { TeacherSchema } from './Teacher/Entity/teacher.model';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    //MongooseModule.forRoot('mongodb://localhost:27017/Universitydb'),
    MongooseModule.forFeature([{name:'teacher',schema:TeacherSchema}]),
      GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile:join(process.cwd(),'src/schema.gql'),}),
 TeacherModule,
 StudentModule
],

})
export class AppModule {}
