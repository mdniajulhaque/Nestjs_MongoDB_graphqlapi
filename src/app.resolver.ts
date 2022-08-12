import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { GraphQLModule,Resolver,Query,Args, Mutation, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { AppService } from './app.service';
import { CreateteacherInput,teacherid,UpdateteacherInput } from './teacher.input';
import { Teacher } from './teacher.model';


@Resolver((of) => Teacher)
export class AppController {

  constructor(private readonly appService: AppService) {}
  
  @Mutation(returns => Teacher)
  async createTeacher(@Args('input') input: CreateteacherInput) {
    return await this.appService.createTeacher(input);
  }

  @Query(returns => [Teacher])
  async getAllTeachers(){
    return await this.appService.readTeacher()
  }


@Mutation(returns => Teacher)
async updateTeacher(@Args('updateteacher') updateteacher: UpdateteacherInput){
  return await this.appService.updateTeacher(updateteacher)
}


@Mutation(returns => Teacher)
async deleteTeacherbyid(@Args('postId') postId: teacherid){
  return await this.appService.deleteTeacher(postId.id)
  }
}