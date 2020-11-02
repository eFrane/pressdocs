<?php
/**
 * @copyright 2020
 * @author Stefan "eFrane" Graupner <stefan.graupner@gmail.com>
 */

namespace App\Command;


use EFrane\PharBuilder\Command\PharCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;

class ScanCommand extends PharCommand
{
    public static $defaultName = 'scan';

    public function configure()
    {
        $this->setDescription('Gather documentation and output it as json');

        $this->addArgument(
            'scandir',
            InputArgument::IS_ARRAY | InputArgument::REQUIRED, '
            Paths to scan for documentation'
        );

        $this->addOption(
            'include-vcs-ignored',
            '',
            InputOption::VALUE_NONE,
            'Include vcs ignored files in the scan'
        );
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $finder = Finder::create()
            ->ignoreVCSIgnored(!$input->getOption('include-vcs-ignored'))
            ->in($input->getArgument('scandir'))
            ->name('*.php')
            ->files();

        foreach ($finder as $splFileInfo) {
            $output->writeln($splFileInfo->getRealPath());
        }

        return Command::SUCCESS;
    }
}
