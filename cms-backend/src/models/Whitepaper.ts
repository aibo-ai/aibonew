import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

export interface WhitepaperAttributes {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  keyTakeaways: string[];
  pdfUrl: string;
  coverImage?: string;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  topics: string[];
  tags: string[];
  isGated: boolean;
  downloadCount: number;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WhitepaperCreationAttributes extends Optional<WhitepaperAttributes, 'id' | 'coverImage' | 'publishedAt' | 'downloadCount' | 'metaTitle' | 'metaDescription' | 'canonicalUrl' | 'fileSize' | 'createdAt' | 'updatedAt'> {}

class Whitepaper extends Model<WhitepaperAttributes, WhitepaperCreationAttributes> implements WhitepaperAttributes {
  public id!: string;
  public title!: string;
  public slug!: string;
  public abstract!: string;
  public keyTakeaways!: string[];
  public pdfUrl!: string;
  public coverImage?: string;
  public authorId!: string;
  public status!: 'draft' | 'published' | 'archived';
  public publishedAt?: Date;
  public topics!: string[];
  public tags!: string[];
  public isGated!: boolean;
  public downloadCount!: number;
  public metaTitle?: string;
  public metaDescription?: string;
  public canonicalUrl?: string;
  public fileSize!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public author?: User;

  // Instance methods
  public incrementDownloadCount(): Promise<void> {
    this.downloadCount += 1;
    return this.save() as unknown as Promise<void>;
  }

  public isPublished(): boolean {
    return this.status === 'published' && this.publishedAt !== null;
  }

  public getFormattedFileSize(): string {
    const bytes = this.fileSize;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  public getEstimatedReadingTime(): number {
    // Estimate based on file size (rough approximation)
    const wordsPerPage = 250;
    const pages = Math.ceil(this.fileSize / 1024 / 2); // Rough estimate
    return Math.ceil(pages * wordsPerPage / 200); // 200 words per minute
  }
}

Whitepaper.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 255],
        is: /^[a-z0-9-]+$/,
      },
    },
    abstract: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [100, 1000],
      },
    },
    keyTakeaways: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      defaultValue: [],
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false,
      defaultValue: 'draft',
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    topics: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    isGated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    downloadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 60],
      },
    },
    metaDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 160],
      },
    },
    canonicalUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'whitepapers',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['slug'],
        unique: true,
      },
      {
        fields: ['status', 'publishedAt'],
      },
      {
        fields: ['topics'],
        using: 'gin',
      },
      {
        fields: ['tags'],
        using: 'gin',
      },
      {
        fields: ['isGated'],
      },
    ],
  }
);

// Define associations
Whitepaper.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author',
});

User.hasMany(Whitepaper, {
  foreignKey: 'authorId',
  as: 'whitepapers',
});

export default Whitepaper;
