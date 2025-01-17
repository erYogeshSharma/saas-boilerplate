import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/schemas/user.schema';
import { EmailService } from 'src/util/email/email.service';

type AuthResponse = {
  user: Partial<User>;
  accessToken: string;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly emailService: EmailService
  ) {}

  // Register new user
  async register(createUserDto: SignUpDto): Promise<AuthResponse> {
    const exists = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (exists) {
      throw new ConflictException('User already exists');
    } else {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      createUserDto['role'] = 'admin';
      const user = await this.userModel.create(createUserDto);
      this.emailService.sendEmail({
        to: user.email,
        subject: 'Welcome to Our Service!',
        text: "Thank you for signing up. We're excited to have you on board!",
        html: "<p>Thank you for signing up. We're <strong>excited</strong> to have you on board!</p>",
      });
      const response = await this.login(user);
      return response;
    }
  }

  // Validate user
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  // Login and return JWT token
  async login(user: any): Promise<AuthResponse> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user._id,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    console.log(user.name);
    return {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user?.organization,
      },
      accessToken,
    };
  }

  // Verify token
  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {
      return e;
    }
  }

  async forgotPassword(email: string): Promise<boolean> {
    try {
      this.logger.log('Enter into forgotPassword method in AuthService');
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new ConflictException('User not found');
      }
      const token = this.jwtService.sign({ email, sub: user._id });
      user.resetPasswordLink = token;
      await user.save();
      await this.emailService.sendEmail({
        to: user.email,
        subject: 'Password Reset Link',
        text: 'Hey, Click on the link below to reset your password',
        html: `<div>
        <h1>Reset Password</h1>
        <p>Hey <strong>${user.name}</strong> Click on the link below to reset your password</p>
        <a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a>
        </div>`.trim(),
      });
      return true;
    } catch (error) {
      this.logger.error(
        'Error in forgotPassword method in AuthService',
        error.stack
      );
      throw error;
    }
  }
}
