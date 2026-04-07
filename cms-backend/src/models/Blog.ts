import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

export interface BlogAttributes {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  featured_image_alt?: string;
  authorId: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: Date;
  categories: string[];
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogCreationAttributes extends Optional<BlogAttributes, 'id' | 'featured_image' | 'published_at' | 'meta_title' | 'meta_description' | 'canonical_url' | 'viewCount' | 'createdAt' | 'updatedAt'> {}

class Blog extends Model<BlogAttributes, BlogCreationAttributes> implements BlogAttributes {
  public id!: string;
  public title!: string;
  public slug!: string;
  public excerpt!: string;
  public content!: string;
  public featured_image?: string;
  public featured_image_alt?: string;
  public authorId!: string;
  public status!: 'draft' | 'published' | 'archived';
  public published_at?: Date;
  public categories!: string[];
  public tags!: string[];
  public meta_title?: string;
  public meta_description?: string;
  public canonical_url?: string;
  public viewCount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public author?: User;

  // Instance methods
  public incrementViewCount(): Promise<void> {
    this.viewCount += 1;
    return this.save() as unknown as Promise<void>;
  }

  public isPublished(): boolean {
    return this.status === 'published' && this.published_at !== null;
  }

  public getReadingTime(): number {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  public generateTableOfContents(): { id: string; text: string; level: number }[] {
    const headings = this.content.match(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi) || [];
    return headings.map((heading: string, index: number): { id: string; text: string; level: number } => {
      const text = heading.replace(/<[^>]*>/g, '');
      const level = parseInt(heading.match(/<h([1-6])/)?.[1] || '1');
      return {
        id: `heading-${index}`,
        text,
        level
      };
    }) as unknown as { id: string; text: string; level: number }[];   
  }
}

Blog.init(
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
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [5, 500],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    featured_image: {
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
    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    categories: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },

    meta_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    canonical_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    viewCount: {
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
    tableName: 'blogs',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['slug'],
        unique: true,
      },
      {
        fields: ['status', 'published_at'],
      },
      {
        fields: ['categories'],
        using: 'gin',
      },
      {
        fields: ['tags'],
        using: 'gin',
      },
    ],
  }
);

// Define associations
Blog.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author',
});

User.hasMany(Blog, {
  foreignKey: 'authorId',
  as: 'blogs',
});

export default Blog;
