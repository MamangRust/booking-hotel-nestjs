import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFiles, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from 'src/models/room';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Room')
@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new room' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiResponse({ status: 201, description: 'The room has been successfully created', type: Room })
    @UseInterceptors(FilesInterceptor('images'))
    create(@Body() createRoomDto: CreateRoomDto, @UploadedFiles(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            ]
        })
    ) images: Express.Multer.File[]): Promise<Room> {
        return this.roomService.create(createRoomDto, images);
    }

    @Get()
    @ApiOperation({ summary: 'Get all rooms' })
    @ApiOkResponse({ description: 'List of rooms', type: Room, isArray: true })
    findAll(): Promise<Room[]> {
        return this.roomService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a room by ID' })
    @ApiParam({ name: 'id', description: 'Room ID' })
    @ApiOkResponse({ description: 'Room details', type: Room })
    @ApiNotFoundResponse({ description: 'Room not found' })
    findOne(@Param('id', ParseIntPipe) id: string): Promise<Room> {
        return this.roomService.findOne(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a room by ID' })
    @ApiParam({ name: 'id', description: 'Room ID' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiResponse({ status: 200, description: 'The room has been successfully updated', type: Room })
    @ApiNotFoundResponse({ description: 'Room not found' })
    @UseInterceptors(FilesInterceptor('images'))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRoomDto: UpdateRoomDto, @UploadedFiles(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            ]
        })
    ) images: Express.Multer.File[]): Promise<Room> {
        return this.roomService.update(id, updateRoomDto, images);
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a room by ID' })
    @ApiParam({ name: 'id', description: 'Room ID' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiResponse({ status: 200, description: 'The room has been successfully deleted' })
    @ApiNotFoundResponse({ description: 'Room not found' })
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.roomService.remove(id);
    }
}
