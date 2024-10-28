import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
    @ApiProperty({ description: '数据列表' })
    list: T[];

    @ApiProperty({ description: '总数' })
    total: number;

    @ApiProperty({ description: '当前页' })
    page: number;

    @ApiProperty({ description: '每页数量' })
    pageSize: number;
}
