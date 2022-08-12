import { Injectable } from '@nestjs/common';
import { Teacher,TeacherDocument } from './teacher.model';
import {Model} from 'mongoose';
var mongoose = require('mongoose');
import { InjectModel } from '@nestjs/mongoose';
import { filter } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('teacher') private readonly teacherModel: Model<TeacherDocument>
  ){}

  //  creating a user 
  async createTeacher(teacher): Promise<Teacher>{
     const newteacher = await new this.teacherModel(teacher)
     return newteacher.save()
  }

  //  reading the user collection 
  async readTeacher():Promise<Teacher[]>{
    return await this.teacherModel.find({});
  }

  async updateTeacher(data):Promise<Teacher>{
    const _id = mongoose.Types.ObjectId(data.id);
    return await this.teacherModel.findByIdAndUpdate(_id,data,{new:true});
    //filter_.id = _id;
    //filter_.username = data.username;
    //filter_.age = data.age;
    //filter_.address=data.address;

    //return  filter_.save()
  
  }

  // deleting the data 
  async deleteTeacher(id:string):Promise<Teacher>{
    const _id = mongoose.Types.ObjectId(id);
    return await this.teacherModel.findByIdAndDelete(_id)
  }
}
